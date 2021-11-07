const express = require("express");

const app = express();
app.use(express.json());

let toDo = [
  { id: 8, title: "sleep", isCompleted: true },
  { id: 1, title: "play", isCompleted: false },
  { id: 2, title: "code", isCompleted: true },
  { id: 3, title: "train", isCompleted: false },
];

app.get("/showAll", (req, res) => {
  res.status(200);
  res.json(toDo);
});

app.get("/showFirst", (req, res) => {
  res.status(200);
  res.json(toDo[0]);
});

//add fixed element
app.post("/add_task_fixed", (req, res) => {
  toDo.push({ id: 4, title: "newtitle", isCompleted: false });
  res.json(toDo);
});

//add from body in postman
app.post("/add_task_body", (req, res) => {
  const { id, title, isCompleted } = req.body;
  toDo.push({ id: id, title: title, isCompleted: isCompleted });
  res.json(toDo);
});

//add from params in link
app.post("/addtask/:id/:title/:completed", (req, res) => {
  const mine = {
    id: req.params.id,
    title: req.params.title,
    isCompleted: req.params.completed,
  };
  toDo.push(mine);
  res.json(toDo);
});

app.get("/completed", (req, res) => {
  const completed = toDo.filter((elem) => elem.isCompleted === true);
  res.json(completed);
});

app.get("/notcompleted", (req, res) => {
  const notcompleted = toDo.filter((elem) => elem.isCompleted === false);
  res.json(notcompleted);
});

//delete
app.delete("/delete/:id", (req, res) => {
  const findID = toDo.find((element) => element.id == req.params.id);
  toDo.splice(findID.id, 1);
  res.json(toDo);
});

//update
app.put("/update/:id/:newtitle", (req, res) => {
  const updated = toDo.map((element) => {
    if (element.id == req.params.id) {
      return {
        id: element.id,
        title: req.params.newtitle,
        isCompleted: element.isCompleted,
      };
    } else return element;
  });
  res.json(updated);
});

app.listen(5000, (req, res) => {
  console.log("server is running...");
});
