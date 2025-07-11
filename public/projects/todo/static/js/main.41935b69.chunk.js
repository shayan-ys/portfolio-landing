;(this["webpackJsonptodo-list"] = this["webpackJsonptodo-list"] || []).push([
  [0],
  {
    13: function (t, e, o) {
      t.exports = o(21)
    },
    18: function (t, e, o) {},
    19: function (t, e, o) {},
    20: function (t, e, o) {},
    21: function (t, e, o) {
      "use strict"
      o.r(e)
      var n = o(0),
        a = o.n(n),
        i = o(5),
        l = o.n(i),
        c = (o(18), o(22)),
        s = o(6),
        d = o(7),
        r = o(10),
        u = o(8),
        m = o(2),
        h = o(11),
        f = (o(19), o(9))
      o(20)
      function p(t) {
        return a.a.createElement(
          "li",
          {
            "data-id": t.todo.id,
            className: t.todo.completed ? "is-done" : "",
            onClick: function (e) {
              return t.handleClick(t.todo.id, e)
            },
          },
          a.a.createElement("i", {
            className: t.todo.completed
              ? "completed far fa-check-circle"
              : "completed far fa-circle",
          }),
          t.todo.text,
          a.a.createElement(
            "button",
            {
              className: "delete",
              onClick: function (e) {
                return t.handleDelete(t.todo.id, e)
              },
            },
            "\u2715"
          )
        )
      }
      var v = (function (t) {
        function e(t) {
          var o
          ;(Object(s.a)(this, e),
            ((o = Object(r.a)(this, Object(u.a)(e).call(this, t))).cookies = new f.a()))
          var n = o.cookies.get("todo")
          return (
            (o.state = n || {
              todoList: {},
              count_total: 0,
              count_incomplete: 0,
              next_id: 0,
              new_todo_value: "",
            }),
            (o.handleNewTodoChange = o.handleNewTodoChange.bind(Object(m.a)(o))),
            o
          )
        }
        return (
          Object(h.a)(e, t),
          Object(d.a)(e, [
            {
              key: "componentDidMount",
              value: function () {
                this.nameInput.focus()
              },
            },
            {
              key: "setStateCallback",
              value: function () {
                var t = new Date()
                ;(t.setTime(t.getTime() + 3122064e6),
                  this.cookies.set("todo", this.state, { path: "/", expires: t }),
                  this.nameInput.focus())
              },
            },
            {
              key: "cross",
              value: function (t) {
                this.setState(function (e, o) {
                  if (!e.todoList.hasOwnProperty(t)) return {}
                  var n = !e.todoList[t].completed
                  return (
                    (e.todoList[t].completed = n),
                    { todoList: e.todoList, count_incomplete: e.count_incomplete + (n ? -1 : 1) }
                  )
                }, this.setStateCallback)
              },
            },
            {
              key: "addTodo",
              value: function () {
                this.setState(function (t, e) {
                  return "" === t.new_todo_value.trim()
                    ? { new_todo_value: "" }
                    : ((t.todoList[t.next_id] = {
                        id: t.next_id,
                        text: t.new_todo_value,
                        completed: !1,
                      }),
                      {
                        new_todo_value: "",
                        todoList: t.todoList,
                        count_total: t.count_total + 1,
                        count_incomplete: t.count_incomplete + 1,
                        next_id: t.next_id + 1,
                      })
                }, this.setStateCallback)
              },
            },
            {
              key: "removeTodo",
              value: function (t) {
                this.setState(function (e, o) {
                  if (!e.todoList.hasOwnProperty(t)) return {}
                  var n = e.todoList[t].completed
                  return (
                    delete e.todoList[t],
                    {
                      todoList: e.todoList,
                      count_total: e.count_total - 1,
                      count_incomplete: e.count_incomplete + (n ? 0 : -1),
                    }
                  )
                }, this.setStateCallback)
              },
            },
            {
              key: "handleNewTodoChange",
              value: function (t) {
                this.setState({ new_todo_value: t.target.value })
              },
            },
            {
              key: "handleSubmit",
              value: function (t) {
                ;(t.preventDefault(), this.addTodo(t))
              },
            },
            {
              key: "render",
              value: function () {
                var t = this
                return a.a.createElement(
                  "div",
                  { className: "container text-center" },
                  a.a.createElement(
                    "ul",
                    { className: "todo-list text-left" },
                    Object.values(this.state.todoList).map(function (e) {
                      return a.a.createElement(p, {
                        todo: e,
                        key: e.id,
                        handleClick: t.cross.bind(t),
                        handleDelete: t.removeTodo.bind(t),
                      })
                    })
                  ),
                  a.a.createElement(
                    "form",
                    {
                      onSubmit: function (e) {
                        return t.handleSubmit(e)
                      },
                    },
                    a.a.createElement(
                      "div",
                      { className: "d-flex bd-highlight" },
                      a.a.createElement(
                        "div",
                        { className: "flex-grow-1 bd-highlight" },
                        a.a.createElement("input", {
                          type: "text",
                          className: "new-todo",
                          style: { height: 35 },
                          value: this.state.new_todo_value,
                          onChange: this.handleNewTodoChange,
                          placeholder: "Add new item",
                          ref: function (e) {
                            t.nameInput = e
                          },
                        })
                      ),
                      a.a.createElement(
                        "div",
                        { className: "bd-highlight" },
                        a.a.createElement(
                          "button",
                          { type: "submit", className: "btn btn-primary add-button" },
                          a.a.createElement("i", { className: "fa fa-plus" })
                        )
                      )
                    )
                  ),
                  a.a.createElement("hr", null),
                  a.a.createElement(
                    "p",
                    null,
                    this.state.count_incomplete,
                    " remaining out of ",
                    this.state.count_total,
                    " tasks"
                  )
                )
              },
            },
          ]),
          e
        )
      })(a.a.Component)
      var _ = function () {
        return a.a.createElement(c.a, null, a.a.createElement(v, null))
      }
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
      )
      ;(l.a.render(a.a.createElement(_, null), document.getElementById("root")),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function (t) {
            t.unregister()
          }))
    },
  },
  [[13, 1, 2]],
])
//# sourceMappingURL=main.41935b69.chunk.js.map
