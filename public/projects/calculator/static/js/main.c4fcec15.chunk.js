;(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    41: function (e, a, t) {
      e.exports = t.p + "static/media/logo.5d5d9eef.svg"
    },
    51: function (e, a, t) {
      e.exports = t(73)
    },
    56: function (e, a, t) {},
    57: function (e, a, t) {},
    73: function (e, a, t) {
      "use strict"
      t.r(a)
      var n = t(0),
        l = t.n(n),
        r = t(17),
        c = t.n(r),
        o = (t(56), t(41)),
        i = t.n(o),
        u = (t(57), t(96)),
        s = t(103),
        p = t(102),
        m = t(105),
        d = t(32),
        k = t(20),
        v = t(37),
        E = t(33),
        C = t(12),
        h = t(36),
        b = t(104),
        V = t(101),
        f = t(98),
        g = t(99),
        w = t(97),
        y = t(100),
        S = t(75),
        j = (function (e) {
          function a(e) {
            var t
            return (
              Object(d.a)(this, a),
              ((t = Object(v.a)(this, Object(E.a)(a).call(this, e))).classes = void 0),
              (t.clickHandler = t.clickHandler.bind(Object(C.a)(t))),
              t
            )
          }
          return (
            Object(h.a)(a, e),
            Object(k.a)(a, [
              {
                key: "clickHandler",
                value: function () {
                  this.props.onClick(this.props.value)
                },
              },
              {
                key: "render",
                value: function () {
                  var e = { width: "100%", height: 67, fontSize: 23, backgroundColor: "inherit" }
                  return (
                    ["=", "+", "\u2212", "\xd7", "\xf7"].indexOf(this.props.value) > -1 &&
                      (e.backgroundColor = "orange"),
                    l.a.createElement(
                      S.a,
                      { style: e, onClick: this.clickHandler, href: "" },
                      this.props.value
                    )
                  )
                },
              },
            ]),
            a
          )
        })(l.a.Component),
        O = Object(u.a)(function (e) {
          return {
            root: { width: "100%", marginTop: e.spacing(3), overflowX: "auto" },
            table: {},
            tableBody: {},
            row: {},
            cell: { width: "25%", border: "1px solid #ddd" },
            input: { padding: 10, flex: 1, width: "100%", fontSize: 47 },
            secondary_input: { position: "absolute", right: 10, fontSize: 19, opacity: 0.3 },
          }
        }),
        N = function (e) {
          var a = O(),
            t = 1
          return (
            "." === e.value && (t = 2),
            l.a.createElement(
              w.a,
              { className: a.cell, colSpan: t },
              l.a.createElement(j, { value: e.value, onClick: e.onClick })
            )
          )
        },
        x = function (e) {
          var a = O()
          return l.a.createElement(
            f.a,
            { className: a.table, padding: "none" },
            l.a.createElement(
              g.a,
              { className: a.tableBody },
              l.a.createElement(
                y.a,
                null,
                l.a.createElement(
                  w.a,
                  { className: a.cell, style: { position: "relative" }, colSpan: 4 },
                  l.a.createElement("div", { className: a.input }, e.displayValue),
                  l.a.createElement(
                    "span",
                    { className: a.secondary_input, style: { top: 10 } },
                    e.clipboard
                  ),
                  l.a.createElement(
                    "span",
                    { className: a.secondary_input, style: { top: 37 } },
                    e.operation
                  )
                )
              ),
              l.a.createElement(
                y.a,
                null,
                l.a.createElement(N, { onClick: e.onClick, value: "AC" }),
                l.a.createElement(N, { onClick: e.onClick, value: "+/-" }),
                l.a.createElement(N, { onClick: e.onClick, value: "%" }),
                l.a.createElement(N, { onClick: e.onClick, value: "\xf7" })
              ),
              l.a.createElement(
                y.a,
                null,
                l.a.createElement(N, { onClick: e.onClick, value: "7" }),
                l.a.createElement(N, { onClick: e.onClick, value: "8" }),
                l.a.createElement(N, { onClick: e.onClick, value: "9" }),
                l.a.createElement(N, { onClick: e.onClick, value: "\xd7" })
              ),
              l.a.createElement(
                y.a,
                null,
                l.a.createElement(N, { onClick: e.onClick, value: "4" }),
                l.a.createElement(N, { onClick: e.onClick, value: "5" }),
                l.a.createElement(N, { onClick: e.onClick, value: "6" }),
                l.a.createElement(N, { onClick: e.onClick, value: "\u2212" })
              ),
              l.a.createElement(
                y.a,
                null,
                l.a.createElement(N, { onClick: e.onClick, value: "1" }),
                l.a.createElement(N, { onClick: e.onClick, value: "2" }),
                l.a.createElement(N, { onClick: e.onClick, value: "3" }),
                l.a.createElement(N, { onClick: e.onClick, value: "+" })
              ),
              l.a.createElement(
                y.a,
                null,
                l.a.createElement(N, { onClick: e.onClick, value: "0" }),
                l.a.createElement(N, { onClick: e.onClick, value: "." }),
                l.a.createElement(N, { onClick: e.onClick, value: "=" })
              )
            )
          )
        },
        A = t(72)
      function B(e, a, t) {
        var n = A(e || "0"),
          l = A(a || "0")
        switch (t) {
          case "+":
            return n.plus(l).toString()
          case "\u2212":
            return n.minus(l).toString()
          case "\xd7":
            return n.times(l).toString()
          case "\xf7":
            return "0" === l ? (alert("Divide by 0 error"), "0") : n.div(l).toString()
          default:
            throw Error("Unknown operation '".concat(t, "'"))
        }
      }
      var H = (function (e) {
          function a(e) {
            var t
            return (
              Object(d.a)(this, a),
              ((t = Object(v.a)(this, Object(E.a)(a).call(this, e))).handleClick = function (e) {
                t.setState(
                  (function (e, a) {
                    switch (a) {
                      case "AC":
                        return { clipboard: null, currentVal: null, operation: null }
                      case "%":
                        if (e.operation && e.currentVal) {
                          var t = B(e.clipboard, e.currentVal, e.operation)
                          return {
                            clipboard: A(t).div(A("100")).toString(),
                            currentVal: null,
                            operation: null,
                          }
                        }
                        return e.currentVal
                          ? { currentVal: A(e.currentVal).div(A("100")).toString() }
                          : {}
                      case ".":
                        return e.currentVal
                          ? e.currentVal.includes(".")
                            ? {}
                            : { currentVal: e.currentVal + "." }
                          : { currentVal: "0." }
                      case "=":
                        return e.currentVal && e.operation
                          ? {
                              clipboard: B(e.clipboard, e.currentVal, e.operation),
                              currentVal: null,
                              operation: null,
                            }
                          : {}
                      case "+/-":
                        return e.currentVal
                          ? { currentVal: (-1 * parseFloat(e.currentVal)).toString() }
                          : e.clipboard
                            ? { clipboard: (-1 * parseFloat(e.clipboard)).toString() }
                            : {}
                    }
                    return /[0-9]+/.test(a)
                      ? "0" === a && "0" === e.currentVal
                        ? {}
                        : e.operation
                          ? e.currentVal
                            ? { currentVal: e.currentVal + a }
                            : { currentVal: a }
                          : e.currentVal
                            ? {
                                currentVal: "0" === e.currentVal ? a : e.currentVal + a,
                                clipboard: null,
                              }
                            : { currentVal: a, clipboard: null }
                      : e.operation
                        ? {
                            clipboard: B(e.clipboard, e.currentVal, e.operation),
                            currentVal: null,
                            operation: a,
                          }
                        : e.currentVal
                          ? { clipboard: e.currentVal, currentVal: null, operation: a }
                          : { operation: a }
                  })(t.state, e)
                )
              }),
              (t.state = { clipboard: null, currentVal: null, operation: null }),
              (t.handleClick = t.handleClick.bind(Object(C.a)(t))),
              t
            )
          }
          return (
            Object(h.a)(a, e),
            Object(k.a)(a, [
              {
                key: "render",
                value: function () {
                  return l.a.createElement(
                    V.a,
                    { style: { marginTop: 35 }, maxWidth: "xs" },
                    l.a.createElement(
                      b.a,
                      { boxShadow: "1" },
                      l.a.createElement(x, {
                        onClick: this.handleClick,
                        displayValue: this.state.currentVal || this.state.clipboard || "0",
                        clipboard: this.state.clipboard,
                        operation: this.state.operation,
                      })
                    )
                  )
                },
              },
            ]),
            a
          )
        })(l.a.Component),
        z = Object(u.a)(function (e) {
          return { appsLink: { position: "absolute", left: 25 } }
        }),
        D = function () {
          var e = z()
          return l.a.createElement(
            "div",
            { className: "App" },
            l.a.createElement(
              "header",
              { className: "App-header" },
              l.a.createElement(
                p.a,
                {
                  href: "/projects",
                  variant: "contained",
                  color: "primary",
                  className: e.appsLink,
                },
                "\uff1c ",
                l.a.createElement(m.a, { xsDown: !0 }, "Back to Apps")
              ),
              l.a.createElement(
                s.a,
                { container: !0, direction: "row", justify: "center", alignItems: "center" },
                l.a.createElement(
                  s.a,
                  { item: !0, className: "App-header-container" },
                  l.a.createElement("b", null, "ReactJS")
                ),
                l.a.createElement(
                  s.a,
                  { item: !0, className: "App-logo-container" },
                  l.a.createElement("img", { src: i.a, className: "App-logo", alt: "logo" })
                ),
                l.a.createElement(
                  s.a,
                  { item: !0, className: "App-header-container" },
                  l.a.createElement(
                    "b",
                    null,
                    l.a.createElement(
                      "a",
                      { href: "/projects", style: { color: "white", textDecoration: "none" } },
                      "ShayanYs"
                    )
                  )
                )
              )
            ),
            l.a.createElement("div", null, l.a.createElement(H, null))
          )
        }
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
      )
      ;(c.a.render(l.a.createElement(D, null), document.getElementById("root")),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function (e) {
            e.unregister()
          }))
    },
  },
  [[51, 1, 2]],
])
//# sourceMappingURL=main.c4fcec15.chunk.js.map
