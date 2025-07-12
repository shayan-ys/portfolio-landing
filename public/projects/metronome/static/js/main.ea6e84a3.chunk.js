;(this.webpackJsonpmetronome = this.webpackJsonpmetronome || []).push([
  [0],
  {
    53: function (e, t, a) {
      e.exports = {
        SpeedNumberInput: "Buttons_SpeedNumberInput__kzHBO",
        SliderRowWrapper: "Buttons_SliderRowWrapper__1_kU8",
      }
    },
    56: function (e, t, a) {
      e.exports = { FooterBar: "Metronome_FooterBar__2Sa-X" }
    },
    64: function (e, t, a) {},
    68: function (e, t, a) {
      e.exports = { Slider: "Slider_Slider__1ZFiO" }
    },
    73: function (e, t, a) {},
    86: function (e, t, a) {
      e.exports = a(98)
    },
    91: function (e, t, a) {},
    98: function (e, t, a) {
      "use strict"
      a.r(t)
      var n = a(0),
        r = a.n(n),
        o = a(10),
        c = a.n(o),
        l = (a(91), a(75)),
        i = a(18),
        s = a(19),
        u = a(20),
        d = a(21),
        p = a(56),
        m = a.n(p),
        h = a(64),
        E = a.n(h),
        v = a(23),
        y = a(45),
        b = function (e) {
          return { type: "SET_SPEED", value: e }
        },
        g = {
          clock: "./audio/clock.wav",
          button18: "./audio/button18.wav",
          switch8: "./audio/switch8.wav",
          "handbag-lock7": "./audio/handbag-lock7.wav",
          button10: "./audio/button10.wav",
        },
        f = { single: 1, half: 0.5, "one-third": 1 / 3, quarter: 0.25 },
        S = { speed: 100, playing: !1, audio_url: g.clock, notes_count: f.quarter, current_step: 1 }
      var O = Object(y.b)(function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : S,
            t = arguments.length > 1 ? arguments[1] : void 0
          switch (t.type) {
            case "SET_SPEED":
              return 40 <= t.value && t.value <= 210 ? Object(v.a)({}, e, { speed: t.value }) : e
            case "SPEED_INCREMENT":
              return e.speed < 210 ? Object(v.a)({}, e, { speed: e.speed + 1 }) : e
            case "SPEED_DECREMENT":
              return 40 < e.speed ? Object(v.a)({}, e, { speed: e.speed - 1 }) : e
            case "PLAY":
              return Object(v.a)({}, e, { playing: !0, current_step: 1 })
            case "STOP":
              return Object(v.a)({}, e, { playing: !1, current_step: 1 })
            case "SET_TONE":
              return Object.values(g).indexOf(t.value) > -1
                ? Object(v.a)({}, e, { audio_url: t.value })
                : e
            case "SET_NOTES_COUNT":
              return t.value in f ? Object(v.a)({}, e, { notes_count: f[t.value] }) : e
            case "STEP_INCREMENT":
              return e.current_step < 1 / e.notes_count
                ? Object(v.a)({}, e, { current_step: e.current_step + 1 })
                : Object(v.a)({}, e, { current_step: 1 })
            default:
              return e
          }
        }),
        _ = a(127),
        k = a(100),
        j = (function (e) {
          Object(d.a)(a, e)
          var t = Object(u.a)(a)
          function a(e) {
            var n
            return (
              Object(i.a)(this, a),
              ((n = t.call(this, e)).state = { step: O.getState().current_step }),
              n
            )
          }
          return (
            Object(s.a)(a, [
              {
                key: "componentDidMount",
                value: function () {
                  var e = this
                  O.subscribe(function () {
                    return e.setState({ step: O.getState().current_step })
                  })
                },
              },
              {
                key: "render",
                value: function () {
                  return r.a.createElement(
                    _.a,
                    {
                      container: !0,
                      direction: "column",
                      justify: "center",
                      alignItems: "center",
                      className: E.a.Display,
                    },
                    r.a.createElement(k.a, { variant: "h3", gutterBottom: !0 }, this.state.step)
                  )
                },
              },
            ]),
            a
          )
        })(r.a.Component),
        N = a(30),
        C = a(53),
        T = a.n(C),
        w = a(70),
        P = a.n(w),
        M = a(69),
        D = a.n(M),
        I = a(71),
        x = a.n(I),
        B = a(72),
        A = a.n(B),
        R = a(130),
        F = a(143),
        W = a(146),
        L = a(148),
        z = a(133),
        V = a(141),
        q = a(101),
        U = a(149),
        Y = a(134),
        J = a(144),
        H = a(136),
        X = a(137),
        Z = a(68),
        $ = a.n(Z),
        G = a(145),
        K = (function (e) {
          Object(d.a)(a, e)
          var t = Object(u.a)(a)
          function a(e) {
            var n
            return (
              Object(i.a)(this, a),
              ((n = t.call(this, e)).state = { speed: O.getState().speed }),
              (n.handleChange = n.handleChange.bind(Object(N.a)(n))),
              n
            )
          }
          return (
            Object(s.a)(a, [
              {
                key: "componentDidMount",
                value: function () {
                  var e = this
                  O.subscribe(function () {
                    return e.setState({ speed: O.getState().speed })
                  })
                },
              },
              {
                key: "handleChange",
                value: function (e, t) {
                  this.setValue(t instanceof Array ? t[0] : t)
                },
              },
              {
                key: "setValue",
                value: function (e) {
                  ;(O.dispatch(b(e)), this.setState({ speed: e }))
                },
              },
              {
                key: "render",
                value: function () {
                  return r.a.createElement(G.a, {
                    className: $.a.Slider,
                    "aria-labelledby": "continuous-slider",
                    valueLabelDisplay: "auto",
                    min: 40,
                    max: 210,
                    value: this.state.speed,
                    onChange: this.handleChange,
                  })
                },
              },
            ]),
            a
          )
        })(r.a.Component),
        Q = (function (e) {
          Object(d.a)(a, e)
          var t = Object(u.a)(a)
          function a(e) {
            var n
            return (
              Object(i.a)(this, a),
              ((n = t.call(this, e)).state = a.speedState(O.getState().speed)),
              (n.handleToneChange = n.handleToneChange.bind(Object(N.a)(n))),
              (n.handleNoteChange = n.handleNoteChange.bind(Object(N.a)(n))),
              n
            )
          }
          return (
            Object(s.a)(
              a,
              [
                {
                  key: "componentDidMount",
                  value: function () {
                    var e = this
                    O.subscribe(function () {
                      return e.setState(a.speedState(O.getState().speed))
                    })
                  },
                },
                {
                  key: "handleToneChange",
                  value: function (e) {
                    var t = e.target.value
                    t in g && O.dispatch({ type: "SET_TONE", value: g[t] })
                  },
                },
                {
                  key: "handleNoteChange",
                  value: function (e) {
                    var t = e.target.value
                    O.dispatch(
                      (function (e) {
                        return { type: "SET_NOTES_COUNT", value: e }
                      })(t)
                    )
                  },
                },
                {
                  key: "render",
                  value: function () {
                    return r.a.createElement(
                      _.a,
                      { container: !0, className: T.a.Buttons },
                      r.a.createElement(
                        _.a,
                        { container: !0, spacing: 2, className: T.a.SliderRowWrapper },
                        r.a.createElement(
                          _.a,
                          { item: !0 },
                          r.a.createElement(
                            R.a,
                            {
                              color: "primary",
                              "aria-label": "add",
                              onClick: function () {
                                return O.dispatch({ type: "SPEED_DECREMENT" })
                              },
                              disabled: !this.state.enableMinus,
                            },
                            r.a.createElement(D.a, { fontSize: "large" })
                          )
                        ),
                        r.a.createElement(
                          _.a,
                          { item: !0, xs: !0 },
                          r.a.createElement(F.a, { mt: 2 }, r.a.createElement(K, null))
                        ),
                        r.a.createElement(
                          _.a,
                          { item: !0 },
                          r.a.createElement(
                            F.a,
                            { mt: 1 },
                            r.a.createElement(W.a, {
                              label: "Speed",
                              type: "number",
                              variant: "outlined",
                              size: "small",
                              className: T.a.SpeedNumberInput,
                              InputLabelProps: { shrink: !0 },
                              value: this.state.speed,
                              onChange: function (e) {
                                return O.dispatch(b(parseInt(e.target.value)))
                              },
                            })
                          )
                        ),
                        r.a.createElement(
                          _.a,
                          { item: !0 },
                          r.a.createElement(
                            R.a,
                            {
                              color: "primary",
                              "aria-label": "add",
                              onClick: function () {
                                return O.dispatch({ type: "SPEED_INCREMENT" })
                              },
                              disabled: !this.state.enablePlus,
                            },
                            r.a.createElement(P.a, { fontSize: "large" })
                          )
                        )
                      ),
                      r.a.createElement(
                        _.a,
                        {
                          container: !0,
                          direction: "column",
                          justify: "center",
                          alignItems: "center",
                          spacing: 0,
                        },
                        r.a.createElement(
                          _.a,
                          { item: !0 },
                          r.a.createElement(
                            L.a,
                            { variant: "outlined" },
                            r.a.createElement(z.a, { htmlFor: "tone-select" }, "Tone"),
                            r.a.createElement(
                              V.a,
                              {
                                native: !0,
                                label: "Tone",
                                inputProps: { name: "tone", id: "tone-select" },
                                onChange: this.handleToneChange,
                                defaultValue: "clock",
                              },
                              Object.keys(g).map(function (e, t) {
                                return r.a.createElement("option", { value: e, key: t }, e)
                              })
                            )
                          )
                        ),
                        r.a.createElement(
                          _.a,
                          { item: !0 },
                          r.a.createElement(
                            L.a,
                            { component: "fieldset" },
                            r.a.createElement(q.a, { component: "legend" }, "Note"),
                            r.a.createElement(
                              U.a,
                              {
                                row: !0,
                                "aria-label": "note",
                                name: "note",
                                defaultValue: "quarter",
                                onChange: this.handleNoteChange,
                              },
                              Object.keys(f).map(function (e, t) {
                                return r.a.createElement(Y.a, {
                                  value: e,
                                  key: t,
                                  control: r.a.createElement(J.a, { color: "primary" }),
                                  label: e,
                                })
                              })
                            )
                          )
                        )
                      ),
                      r.a.createElement(H.a, { variant: "middle" }),
                      r.a.createElement(
                        _.a,
                        { container: !0, justify: "center", alignItems: "center" },
                        r.a.createElement(
                          F.a,
                          { mt: 5 },
                          r.a.createElement(
                            F.a,
                            {
                              component: "span",
                              display: O.getState().playing ? "none" : "inherit",
                            },
                            r.a.createElement(
                              X.a,
                              {
                                variant: "contained",
                                color: "primary",
                                endIcon: r.a.createElement(x.a, null),
                                onClick: function () {
                                  return O.dispatch({ type: "PLAY" })
                                },
                                disabled: O.getState().playing,
                              },
                              "Play"
                            )
                          ),
                          r.a.createElement(
                            F.a,
                            {
                              component: "span",
                              display: O.getState().playing ? "inherit" : "none",
                            },
                            r.a.createElement(
                              X.a,
                              {
                                variant: "contained",
                                color: "default",
                                endIcon: r.a.createElement(A.a, null),
                                onClick: function () {
                                  return O.dispatch({ type: "STOP" })
                                },
                                disabled: !O.getState().playing,
                              },
                              "Stop"
                            )
                          )
                        )
                      )
                    )
                  },
                },
              ],
              [
                {
                  key: "speedState",
                  value: function (e) {
                    return { speed: e, enablePlus: e < 210, enableMinus: e > 40 }
                  },
                },
              ]
            ),
            a
          )
        })(r.a.Component),
        ee = a(73),
        te = a.n(ee)
      function ae(e, t) {
        return (24e4 * t) / e
      }
      var ne = (function (e) {
          Object(d.a)(a, e)
          var t = Object(u.a)(a)
          function a(e) {
            var n
            return (
              Object(i.a)(this, a),
              ((n = t.call(this, e)).audio = void 0),
              (n.intervalPlayer = void 0),
              (n.state = {
                speedMS: ae(O.getState().speed, O.getState().notes_count),
                playing: O.getState().playing,
                loaded: !1,
                step: O.getState().current_step,
                note: O.getState().notes_count,
              }),
              n
            )
          }
          return (
            Object(s.a)(
              a,
              [
                {
                  key: "componentDidMount",
                  value: function () {
                    var e = this
                    O.subscribe(function () {
                      ;(e.setState({
                        speedMS: ae(O.getState().speed, O.getState().notes_count),
                        step: O.getState().current_step,
                        note: O.getState().notes_count,
                      }),
                        !e.state.playing && O.getState().playing
                          ? e.playAudio()
                          : e.state.playing && !O.getState().playing && e.stop())
                    })
                  },
                },
                {
                  key: "loaded",
                  value: function () {
                    ;(console.log("loaded"), this.setState({ loaded: !0 }))
                  },
                },
                {
                  key: "tick",
                  value: function () {
                    var e = this.audio.cloneNode(!0)
                    this.state.step >= 1 / this.state.note &&
                      1 !== this.state.note &&
                      e.childNodes[0].setAttribute(
                        "src",
                        (function () {
                          var e = Object.values(g),
                            t = (e.indexOf(O.getState().audio_url) + 1) % e.length
                          return e[t]
                        })()
                      )
                    try {
                      var t = e.getAttribute("key")
                      ;(e.setAttribute("key", (parseInt(t) + 1).toString()),
                        e.play(),
                        O.dispatch({ type: "STEP_INCREMENT" }))
                    } catch (a) {
                      ;(this.stop(), alert("browser not supported"))
                    }
                  },
                },
                {
                  key: "stop",
                  value: function () {
                    ;(clearInterval(this.intervalPlayer), this.setState({ playing: !1 }))
                  },
                },
                {
                  key: "playAudio",
                  value: function () {
                    var e = this,
                      t = Date.now()
                    ;((this.intervalPlayer = setInterval(function () {
                      Date.now() - t > e.state.speedMS - 5 && ((t = Date.now()), e.tick())
                    }, 5)),
                      this.setState({ playing: !0 }))
                  },
                },
                {
                  key: "render",
                  value: function () {
                    var e = this
                    return r.a.createElement(
                      "div",
                      { className: te.a.AudioPlayer },
                      r.a.createElement(
                        "audio",
                        {
                          ref: function (t) {
                            e.audio = t
                          },
                          key: 0,
                          onLoad: function () {
                            return e.loaded()
                          },
                          onEnded: function (e) {
                            return a.ended(e)
                          },
                        },
                        r.a.createElement("source", {
                          src: O.getState().audio_url,
                          type: "audio/mpeg",
                        })
                      )
                    )
                  },
                },
              ],
              [
                {
                  key: "ended",
                  value: function (e) {
                    e.target.remove()
                  },
                },
              ]
            ),
            a
          )
        })(r.a.Component),
        re = a(138),
        oe = a(139),
        ce = a(140),
        le = a(135),
        ie = a(74),
        se = a.n(ie),
        ue = (function (e) {
          Object(d.a)(a, e)
          var t = Object(u.a)(a)
          function a() {
            return (Object(i.a)(this, a), t.apply(this, arguments))
          }
          return (
            Object(s.a)(a, [
              {
                key: "render",
                value: function () {
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement(
                      re.a,
                      { maxWidth: "sm", className: m.a.Metronome },
                      r.a.createElement(
                        F.a,
                        { boxShadow: 1 },
                        r.a.createElement(
                          oe.a,
                          { position: "static" },
                          r.a.createElement(
                            ce.a,
                            null,
                            r.a.createElement(
                              le.a,
                              { color: "inherit", "aria-label": "menu" },
                              r.a.createElement(se.a, null)
                            ),
                            r.a.createElement(k.a, { variant: "h6" }, "Metronome")
                          )
                        ),
                        r.a.createElement(F.a, { mt: 2, p: 2 }, r.a.createElement(Q, null)),
                        r.a.createElement(F.a, { mt: 1 }, r.a.createElement(j, null))
                      ),
                      r.a.createElement(ne, null)
                    ),
                    r.a.createElement(
                      re.a,
                      { className: m.a.FooterBar },
                      r.a.createElement(
                        k.a,
                        { variant: "body1" },
                        "Designed and developed by ",
                        r.a.createElement("a", { href: "https://shayanys.com" }, "Shayan Ys"),
                        " 2020"
                      )
                    )
                  )
                },
              },
            ]),
            a
          )
        })(r.a.Component)
      var de = function () {
        return r.a.createElement(l.a, { store: O }, r.a.createElement(ue, null))
      }
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
      )
      ;(c.a.render(
        r.a.createElement(r.a.StrictMode, null, r.a.createElement(de, null)),
        document.getElementById("root")
      ),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready
            .then(function (e) {
              e.unregister()
            })
            .catch(function (e) {
              console.error(e.message)
            }))
    },
  },
  [[86, 1, 2]],
])
//# sourceMappingURL=main.ea6e84a3.chunk.js.map
