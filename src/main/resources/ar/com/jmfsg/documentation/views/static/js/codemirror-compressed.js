window.CodeMirror = function () {
    "use strict";

    function e(r, i) {
        function fn(e) {
            if (s.onDragEvent && s.onDragEvent(pn, $(e))) return;
            Q(e)
        }
        function hn(e) {
            return e >= 0 && e < Mt.size
        }
        function dn(e) {
            return R(Mt, e)
        }
        function vn(e, t) {
            Jt = !0;
            var n = t - e.height;
            for (var r = e; r; r = r.parent) r.height += n
        }
        function mn(e, t) {
            return e.styles || e.highlight(Ot, e.stateAfter = oi(U(e)), s.tabSize), e.getContent(s.tabSize, t, s.lineWrapping)
        }
        function gn(e) {
            var t = {
                line: 0,
                ch: 0
            };
            Hn(t, {
                line: Mt.size - 1,
                ch: dn(Mt.size - 1).text.length
            }, xt(e), t, t), zt = !0
        }
        function yn(e) {
            var t = [];
            return Mt.iter(0, Mt.size, function (e) {
                t.push(e.text)
            }), t.join(e || "\n")
        }
        function bn(e) {
            A.scrollTop != Ft && (Ft = bt.scrollTop = A.scrollTop, sr([]))
        }
        function wn(e) {
            s.fixedGutter && st.style.left != bt.scrollLeft + "px" && (st.style.left = bt.scrollLeft + "px"), bt.scrollTop != Ft && (Ft = bt.scrollTop, A.scrollTop != Ft && (A.scrollTop = Ft), sr([])), s.onScroll && s.onScroll(pn)
        }
        function En(e) {
            function u(t) {
                y && (bt.draggable = !1), It = !1, l(), c(), Math.abs(e.clientX - t.clientX) + Math.abs(e.clientY - t.clientY) < 10 && (J(t), dr(n.line, n.ch, !0), Zn())
            }
            function m(e) {
                if (i == "single") cr(n, e);
                else if (i == "double") {
                    var t = Er(e);
                    dt(e, h) ? cr(t.from, v) : cr(h, t.to)
                } else i == "triple" && (dt(e, h) ? cr(v, mr({
                    line: e.line,
                    ch: 0
                })) : cr(h, mr({
                    line: e.line + 1,
                    ch: 0
                })))
            }
            function g(e) {
                var t = Zr(e, !0);
                if (t && !pt(t, a)) {
                    Dt || Dn(), a = t, m(t), zt = !1;
                    var n = ir();
                    if (t.line >= n.to || t.line < n.from) f = setTimeout(hi(function () {
                        g(e)
                    }), 150)
                }
            }
            function b(e) {
                clearTimeout(f);
                var t = Zr(e);
                t && m(t), J(e), Zn(), zt = !0, w(), l()
            }
            lr(Z(e, "shiftKey"));
            for (var t = G(e); t != Ct; t = t.parentNode) if (t.parentNode == ft && t != ot) return;
            for (var t = G(e); t != Ct; t = t.parentNode) if (t.parentNode == it) return s.onGutterClick && s.onGutterClick(pn, Et(it.childNodes, t) + Gt, e), J(e);
            var n = Zr(e);
            switch (Y(e)) {
                case 3:
                    p && ti(e);
                    return;
                case 2:
                    n && dr(n.line, n.ch, !0), setTimeout(Zn, 20), J(e);
                    return
            }
            if (!n) {
                G(e) == bt && J(e);
                return
            }
            Dt || Dn();
            var r = +(new Date),
                i = "single";
            if (jt && jt.time > r - 400 && pt(jt.pos, n)) i = "triple", J(e), setTimeout(Zn, 20), Sr(n.line);
            else if (Bt && Bt.time > r - 400 && pt(Bt.pos, n)) {
                i = "double", jt = {
                    time: r,
                    pos: n
                }, J(e);
                var o = Er(n);
                cr(o.from, o.to)
            } else Bt = {
                time: r,
                pos: n
            };
            var a = n,
                f;
            if (s.dragDrop && rt && !s.readOnly && !pt(Pt.from, Pt.to) && !dt(n, Pt.from) && !dt(Pt.to, n) && i == "single") {
                y && (bt.draggable = !0);
                var l = et(document, "mouseup", hi(u), !0),
                    c = et(bt, "drop", hi(u), !0);
                It = !0, bt.dragDrop && bt.dragDrop();
                return
            }
            J(e), i == "single" && dr(n.line, n.ch, !0);
            var h = Pt.from,
                v = Pt.to,
                w = et(document, "mousemove", hi(function (e) {
                    clearTimeout(f), J(e), !d && !Y(e) ? b(e) : g(e)
                }), !0),
                l = et(document, "mouseup", hi(b), !0)
        }
        function Sn(e) {
            for (var t = G(e); t != Ct; t = t.parentNode) if (t.parentNode == it) return J(e);
            J(e)
        }
        function xn(e) {
            if (s.onDragEvent && s.onDragEvent(pn, $(e))) return;
            J(e);
            var t = Zr(e, !0),
                n = e.dataTransfer.files;
            if (!t || s.readOnly) return;
            if (n && n.length && window.FileReader && window.File) {
                var r = n.length,
                    i = Array(r),
                    o = 0,
                    u = function (e, n) {
                        var s = new FileReader;
                        s.onload = function () {
                            i[n] = s.result, ++o == r && (t = mr(t), hi(function () {
                                var e = zn(i.join(""), t, t);
                                cr(t, e)
                            })())
                        }, s.readAsText(e)
                    };
                for (var a = 0; a < r; ++a) u(n[a], a)
            } else {
                if (It && !dt(t, Pt.from) && !dt(Pt.to, t)) return;
                try {
                    var i = e.dataTransfer.getData("Text");
                    i && pi(function () {
                        var e = Pt.from,
                            n = Pt.to;
                        cr(t, t), It && zn("", e, n), Wn(i), Zn()
                    })
                } catch (e) {}
            }
        }
        function Tn(e) {
            var t = $n();
            e.dataTransfer.setData("Text", t), e.dataTransfer.setDragImage && e.dataTransfer.setDragImage(mt("img"), 0, 0)
        }
        function Nn(e, t) {
            if (typeof e == "string") {
                e = a[e];
                if (!e) return !1
            }
            var n = Ht;
            try {
                s.readOnly && (Rt = !0), t && (Ht = null), e(pn)
            } catch (r) {
                if (r != nt) throw r;
                return !1
            } finally {
                Ht = n, Rt = !1
            }
            return !0
        }
        function kn(e) {
            function f() {
                a = !0
            }
            var t = l(s.keyMap),
                r = t.auto;
            clearTimeout(Cn), r && !h(e) && (Cn = setTimeout(function () {
                l(s.keyMap) == t && (s.keyMap = r.call ? r.call(null, pn) : r)
            }, 50));
            var i = Nt[Z(e, "keyCode")],
                o = !1,
                u = w && n;
            if (i == null || e.altGraphKey) return !1;
            Z(e, "altKey") && (i = "Alt-" + i), Z(e, u ? "metaKey" : "ctrlKey") && (i = "Ctrl-" + i), Z(e, u ? "ctrlKey" : "metaKey") && (i = "Cmd-" + i);
            var a = !1;
            return Z(e, "shiftKey") ? o = c("Shift-" + i, s.extraKeys, s.keyMap, function (e) {
                return Nn(e, !0)
            }, f) || c(i, s.extraKeys, s.keyMap, function (e) {
                if (typeof e == "string" && /^go[A-Z]/.test(e)) return Nn(e)
            }, f) : o = c(i, s.extraKeys, s.keyMap, Nn, f), a && (o = !1), o && (J(e), ni(), d && (e.oldKeyCode = e.keyCode, e.keyCode = 0)), o
        }
        function Ln(e, t) {
            var n = c("'" + t + "'", s.extraKeys, s.keyMap, function (e) {
                return Nn(e, !0)
            });
            return n && (J(e), ni()), n
        }
        function On(e) {
            Dt || Dn(), d && e.keyCode == 27 && (e.returnValue = !1), sn && Gn() && (sn = !1);
            if (s.onKeyEvent && s.onKeyEvent(pn, $(e))) return;
            var t = Z(e, "keyCode");
            lr(t == 16 || Z(e, "shiftKey"));
            var r = kn(e);
            w && (An = r ? t : null, !r && t == 88 && Z(e, n ? "metaKey" : "ctrlKey") && Wn(""))
        }
        function Mn(e) {
            sn && Gn();
            if (s.onKeyEvent && s.onKeyEvent(pn, $(e))) return;
            var t = Z(e, "keyCode"),
                n = Z(e, "charCode");
            if (w && t == An) {
                An = null, J(e);
                return
            }
            if ((w && (!e.which || e.which < 10) || S) && kn(e)) return;
            var r = String.fromCharCode(n == null ? t : n);
            s.electricChars && Ot.electricChars && s.smartIndent && !s.readOnly && Ot.electricChars.indexOf(r) > -1 && setTimeout(hi(function () {
                Tr(Pt.to.line, "smart")
            }), 75);
            if (Ln(e, r)) return;
            Kn()
        }
        function _n(e) {
            if (s.onKeyEvent && s.onKeyEvent(pn, $(e))) return;
            Z(e, "keyCode") == 16 && (Ht = null)
        }
        function Dn() {
            if (s.readOnly == "nocursor") return;
            Dt || (s.onFocus && s.onFocus(pn), Dt = !0, bt.className.search(/\bCodeMirror-focused\b/) == -1 && (bt.className += " CodeMirror-focused")), Jn(), ni()
        }
        function Pn() {
            Dt && (s.onBlur && s.onBlur(pn), Dt = !1, en && hi(function () {
                en && (en(), en = null)
            })(), bt.className = bt.className.replace(" CodeMirror-focused", "")), clearInterval(At), setTimeout(function () {
                Dt || (Ht = null)
            }, 150)
        }
        function Hn(e, t, n, r, i) {
            if (Rt) return;
            var o = [];
            Mt.iter(e.line, t.line + 1, function (e) {
                o.push(P(e.text, e.markedSpans))
            });
            if (un) {
                un.addChange(e.line, n.length, o);
                while (un.done.length > s.undoDepth) un.done.shift()
            }
            var u = M(D(o[0]), D(ct(o)), e.ch, t.ch, n);
            In(e, t, u, r, i)
        }
        function Bn(e, t) {
            if (!e.length) return;
            var n = e.pop(),
                r = [];
            for (var i = n.length - 1; i >= 0; i -= 1) {
                var s = n[i],
                    o = [],
                    u = s.start + s.added;
                Mt.iter(s.start, u, function (e) {
                    o.push(P(e.text, e.markedSpans))
                }), r.push({
                    start: s.start,
                    added: s.old.length,
                    old: o
                });
                var a = {
                    line: s.start + s.old.length - 1,
                    ch: wt(_(ct(o)), _(ct(s.old)))
                };
                In({
                    line: s.start,
                    ch: 0
                }, {
                    line: u - 1,
                    ch: dn(u - 1).text.length
                }, s.old, a, a)
            }
            zt = !0, t.push(r)
        }
        function jn() {
            Bn(un.done, un.undone)
        }
        function Fn() {
            Bn(un.undone, un.done)
        }
        function In(e, t, n, r, i) {
            function w(e) {
                return e <= Math.min(t.line, t.line + g) ? e : e + g
            }
            if (Rt) return;
            var o = !1,
                u = tn.text.length;
            s.lineWrapping || Mt.iter(e.line, t.line + 1, function (e) {
                if (!e.hidden && e.text.length == u) return o = !0, !0
            });
            if (e.line != t.line || n.length > 1) Jt = !0;
            var a = t.line - e.line,
                f = dn(e.line),
                l = dn(t.line),
                c = ct(n);
            if (e.ch == 0 && t.ch == 0 && _(c) == "") {
                var h = [],
                    p = null;
                for (var d = 0, v = n.length - 1; d < v; ++d) h.push(new F(_(n[d]), D(n[d])));
                l.update(l.text, D(c)), a && Mt.remove(e.line, a, Kt), h.length && Mt.insert(e.line, h)
            } else if (f == l) if (n.length == 1) f.update(f.text.slice(0, e.ch) + _(n[0]) + f.text.slice(t.ch), D(n[0]));
            else {
                for (var h = [], d = 1, v = n.length - 1; d < v; ++d) h.push(new F(_(n[d]), D(n[d])));
                h.push(new F(_(c) + f.text.slice(t.ch), D(c))), f.update(f.text.slice(0, e.ch) + _(n[0]), D(n[0])), Mt.insert(e.line + 1, h)
            } else if (n.length == 1) f.update(f.text.slice(0, e.ch) + _(n[0]) + l.text.slice(t.ch), D(n[0])), Mt.remove(e.line + 1, a, Kt);
            else {
                var h = [];
                f.update(f.text.slice(0, e.ch) + _(n[0]), D(n[0])), l.update(_(c) + l.text.slice(t.ch), D(c));
                for (var d = 1, v = n.length - 1; d < v; ++d) h.push(new F(_(n[d]), D(n[d])));
                a > 1 && Mt.remove(e.line + 1, a - 1, Kt), Mt.insert(e.line + 1, h)
            }
            if (s.lineWrapping) {
                var m = Math.max(5, bt.clientWidth / Qr() - 3);
                Mt.iter(e.line, e.line + n.length, function (e) {
                    if (e.hidden) return;
                    var t = Math.ceil(e.text.length / m) || 1;
                    t != e.height && vn(e, t)
                })
            } else Mt.iter(e.line, e.line + n.length, function (e) {
                var t = e.text;
                !e.hidden && t.length > u && (tn = e, u = t.length, rn = !0, o = !1)
            }), o && (nn = !0);
            _t = Math.min(_t, e.line), ai(400);
            var g = n.length - a - 1;
            Xt.push({
                from: e.line,
                to: t.line + 1,
                diff: g
            });
            if (s.onChange) {
                for (var d = 0; d < n.length; ++d) typeof n[d] != "string" && (n[d] = n[d].text);
                var y = {
                    from: e,
                    to: t,
                    text: n
                };
                if (Vt) {
                    for (var b = Vt; b.next; b = b.next);
                    b.next = y
                } else Vt = y
            }
            hr(mr(r), mr(i), w(Pt.from.line), w(Pt.to.line))
        }
        function qn() {
            var e = Mt.height * $r() + 2 * Gr();
            return e * .99 > bt.offsetHeight ? e : !1
        }
        function Rn(e) {
            var t = qn();
            A.style.display = t ? "block" : "none", t ? (k.style.height = ft.style.minHeight = t + "px", A.style.height = bt.clientHeight + "px", e != null && (A.scrollTop = bt.scrollTop = e, y && setTimeout(function () {
                if (A.scrollTop != e) return;
                A.scrollTop = e + (e ? -1 : 1), A.scrollTop = e
            }, 0))) : ft.style.minHeight = "", ot.style.top = Qt * $r() + "px"
        }
        function Un() {
            tn = dn(0), rn = !0;
            var e = tn.text.length;
            Mt.iter(1, Mt.size, function (t) {
                var n = t.text;
                !t.hidden && n.length > e && (e = n.length, tn = t)
            }), nn = !1
        }
        function zn(e, t, n) {
            function r(r) {
                if (dt(r, t)) return r;
                if (!dt(n, r)) return i;
                var s = r.line + e.length - (n.line - t.line) - 1,
                    o = r.ch;
                return r.line == n.line && (o += ct(e).length - (n.ch - (n.line == t.line ? t.ch : 0))), {
                    line: s,
                    ch: o
                }
            }
            t = mr(t), n ? n = mr(n) : n = t, e = xt(e);
            var i;
            return Xn(e, t, n, function (e) {
                return i = e, {
                    from: r(Pt.from),
                    to: r(Pt.to)
                }
            }), i
        }
        function Wn(e, t) {
            Xn(xt(e), Pt.from, Pt.to, function (e) {
                return t == "end" ? {
                    from: e,
                    to: e
                } : t == "start" ? {
                    from: Pt.from,
                    to: Pt.from
                } : {
                    from: Pt.from,
                    to: e
                }
            })
        }
        function Xn(e, t, n, r) {
            var i = e.length == 1 ? e[0].length + t.ch : ct(e).length,
                s = r({
                    line: t.line + e.length - 1,
                    ch: i
                });
            Hn(t, n, e, s.from, s.to)
        }
        function Vn(e, t, n) {
            var r = e.line,
                i = t.line;
            if (r == i) return dn(r).text.slice(e.ch, t.ch);
            var s = [dn(r).text.slice(e.ch)];
            return Mt.iter(r + 1, i, function (e) {
                s.push(e.text)
            }), s.push(dn(i).text.slice(0, t.ch)), s.join(n || "\n")
        }
        function $n(e) {
            return Vn(Pt.from, Pt.to, e)
        }
        function Jn() {
            if (sn) return;
            kt.set(s.pollInterval, function () {
                Gn(), Dt && Jn()
            })
        }
        function Kn() {
            function t() {
                var n = Gn();
                !n && !e ? (e = !0, kt.set(60, t)) : (sn = !1, Jn())
            }
            var e = !1;
            sn = !0, kt.set(20, t)
        }
        function Gn() {
            if (!Dt || Tt(E) || s.readOnly) return !1;
            var e = E.value;
            if (e == Qn) return !1;
            ci || fi(), Ht = null;
            var t = 0,
                n = Math.min(Qn.length, e.length);
            while (t < n && Qn[t] == e[t])++t;
            return t < Qn.length ? Pt.from = {
                line: Pt.from.line,
                ch: Pt.from.ch - (Qn.length - t)
            } : qt && pt(Pt.from, Pt.to) && !Ut && (Pt.to = {
                line: Pt.to.line,
                ch: Math.min(dn(Pt.to.line).text.length, Pt.to.ch + (e.length - t))
            }), Wn(e.slice(t), "end"), e.length > 1e3 ? E.value = Qn = "" : Qn = e, ci || li(), Ut = !1, !0
        }
        function Yn(e) {
            pt(Pt.from, Pt.to) ? e && (Qn = E.value = "") : (Qn = "", E.value = $n(), Dt && ht(E))
        }
        function Zn() {
            s.readOnly != "nocursor" && E.focus()
        }
        function er() {
            var e = tr();
            nr(e.x, e.y, e.x, e.yBot);
            if (!Dt) return;
            var t = ft.getBoundingClientRect(),
                n = null;
            e.y + t.top < 0 ? n = !0 : e.y + t.top + $r() > (window.innerHeight || document.documentElement.clientHeight) && (n = !1);
            if (n != null) {
                var r = B.style.display == "none";
                r && (B.style.display = "", B.style.left = e.x + "px", B.style.top = e.y - Qt + "px"), B.scrollIntoView(n), r && (B.style.display = "none")
            }
        }
        function tr() {
            var e = Rr(Pt.inverted ? Pt.from : Pt.to),
                t = s.lineWrapping ? Math.min(e.x, K.offsetWidth) : e.x;
            return {
                x: t,
                y: e.y,
                yBot: e.yBot
            }
        }
        function nr(e, t, n, r) {
            var i = rr(e, t, n, r);
            i.scrollLeft != null && (bt.scrollLeft = i.scrollLeft), i.scrollTop != null && (A.scrollTop = bt.scrollTop = i.scrollTop)
        }
        function rr(e, t, n, r) {
            var i = Yr(),
                o = Gr();
            t += o, r += o, e += i, n += i;
            var u = bt.clientHeight,
                a = A.scrollTop,
                f = {}, l = qn() || Infinity,
                c = t < o + 10,
                h = r + o > l - 10;
            t < a ? f.scrollTop = c ? 0 : Math.max(0, t) : r > a + u && (f.scrollTop = (h ? l : r) - u);
            var p = bt.clientWidth,
                d = bt.scrollLeft,
                v = s.fixedGutter ? st.clientWidth : 0,
                m = e < v + i + 10;
            return e < d + v || m ? (m && (e = 0), f.scrollLeft = Math.max(0, e - 10 - v)) : n > p + d - 3 && (f.scrollLeft = n + 10 - p), f
        }
        function ir(e) {
            var t = $r(),
                n = (e != null ? e : A.scrollTop) - Gr(),
                r = Math.max(0, Math.floor(n / t)),
                i = Math.ceil((n + bt.clientHeight) / t);
            return {
                from: z(Mt, r),
                to: z(Mt, i)
            }
        }
        function sr(e, t, n) {
            function d() {
                var e = O.firstChild,
                    t = !1;
                return Mt.iter(Gt, Yt, function (n) {
                    if (!e) return;
                    if (!n.hidden) {
                        var r = Math.round(e.offsetHeight / c) || 1;
                        n.height != r && (vn(n, r), Jt = t = !0)
                    }
                    e = e.nextSibling
                }), t
            }
            if (!bt.clientWidth) {
                Gt = Yt = Qt = 0;
                return
            }
            var r = ir(n);
            if (e !== !0 && e.length == 0 && r.from > Gt && r.to < Yt) {
                Rn(n);
                return
            }
            var i = Math.max(r.from - 100, 0),
                o = Math.min(Mt.size, r.to + 100);
            Gt < i && i - Gt < 20 && (i = Gt), Yt > o && Yt - o < 20 && (o = Math.min(Mt.size, Yt));
            var u = e === !0 ? [] : or([{
                from: Gt,
                to: Yt,
                domStart: 0
            }], e),
                a = 0;
            for (var f = 0; f < u.length; ++f) {
                var l = u[f];
                l.from < i && (l.domStart += i - l.from, l.from = i), l.to > o && (l.to = o), l.from >= l.to ? u.splice(f--, 1) : a += l.to - l.from
            }
            if (a == o - i && i == Gt && o == Yt) {
                Rn(n);
                return
            }
            u.sort(function (e, t) {
                return e.domStart - t.domStart
            });
            var c = $r(),
                h = st.style.display;
            O.style.display = "none", ur(i, o, u), O.style.display = st.style.display = "";
            var p = i != Gt || o != Yt || Zt != bt.clientHeight + c;
            p && (Zt = bt.clientHeight + c), (i != Gt || o != Yt && s.onViewportChange) && setTimeout(function () {
                s.onViewportChange && s.onViewportChange(pn, i, o)
            }), Gt = i, Yt = o, Qt = W(Mt, i), ai(100);
            if (O.childNodes.length != Yt - Gt) throw new Error("BAD PATCH! " + JSON.stringify(u) + " size=" + (Yt - Gt) + " nodes=" + O.childNodes.length);
            return s.lineWrapping && d(), st.style.display = h, (p || Jt) && ar() && s.lineWrapping && d() && ar(), Rn(n), fr(), !t && s.onUpdate && s.onUpdate(pn), !0
        }
        function or(e, t) {
            for (var n = 0, r = t.length || 0; n < r; ++n) {
                var i = t[n],
                    s = [],
                    o = i.diff || 0;
                for (var u = 0, a = e.length; u < a; ++u) {
                    var f = e[u];
                    i.to <= f.from && i.diff ? s.push({
                        from: f.from + o,
                        to: f.to + o,
                        domStart: f.domStart
                    }) : i.to <= f.from || i.from >= f.to ? s.push(f) : (i.from > f.from && s.push({
                        from: f.from,
                        to: i.from,
                        domStart: f.domStart
                    }), i.to < f.to && s.push({
                        from: i.to + o,
                        to: f.to + o,
                        domStart: f.domStart + (i.to - f.from)
                    }))
                }
                e = s
            }
            return e
        }
        function ur(e, t, n) {
            function r(e) {
                var t = e.nextSibling;
                return e.parentNode.removeChild(e), t
            }
            if (!n.length) gt(O);
            else {
                var i = 0,
                    s = O.firstChild,
                    o;
                for (var u = 0; u < n.length; ++u) {
                    var a = n[u];
                    while (a.domStart > i) s = r(s), i++;
                    for (var f = 0, l = a.to - a.from; f < l; ++f) s = s.nextSibling, i++
                }
                while (s) s = r(s)
            }
            var c = n.shift(),
                s = O.firstChild,
                f = e;
            Mt.iter(e, t, function (e) {
                c && c.to == f && (c = n.shift());
                if (!c || c.from > f) {
                    if (e.hidden) var t = mt("pre");
                    else {
                        var t = mn(e);
                        e.className && (t.className = e.className);
                        if (e.bgClassName) {
                            var r = mt("pre", "\u00a0", e.bgClassName, "position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -2");
                            t = mt("div", [r, t], null, "position: relative")
                        }
                    }
                    O.insertBefore(t, s)
                } else s = s.nextSibling;
                ++f
            })
        }
        function ar() {
            if (!s.gutter && !s.lineNumbers) return;
            var e = ot.offsetHeight,
                t = bt.clientHeight;
            st.style.height = (e - t < 2 ? t : e) + "px";
            var n = document.createDocumentFragment(),
                r = Gt,
                i;
            Mt.iter(Gt, Math.max(Yt, Gt + 1), function (e) {
                if (e.hidden) n.appendChild(mt("pre"));
                else {
                    var t = e.gutterMarker,
                        o = s.lineNumbers ? s.lineNumberFormatter(r + s.firstLineNumber) : null;
                    t && t.text ? o = t.text.replace("%N%", o != null ? o : "") : o == null && (o = "\u00a0");
                    var u = n.appendChild(mt("pre", null, t && t.style));
                    u.innerHTML = o;
                    for (var a = 1; a < e.height; ++a) u.appendChild(mt("br")), u.appendChild(document.createTextNode("\u00a0"));
                    t || (i = r)
                }++r
            }), st.style.display = "none", yt(it, n);
            if (i != null && s.lineNumbers) {
                var o = it.childNodes[i - Gt],
                    u = String(Mt.size).length,
                    a = at(o.firstChild),
                    f = "";
                while (a.length + f.length < u) f += "\u00a0";
                f && o.insertBefore(document.createTextNode(f), o.firstChild)
            }
            st.style.display = "";
            var l = Math.abs((parseInt(K.style.marginLeft) || 0) - st.offsetWidth) > 2;
            return K.style.marginLeft = st.offsetWidth + "px", Jt = !1, l
        }
        function fr() {
            var e = pt(Pt.from, Pt.to),
                t = Rr(Pt.from, !0),
                n = e ? t : Rr(Pt.to, !0),
                r = Pt.inverted ? t : n,
                i = $r(),
                o = ut(Ct),
                u = ut(O);
            C.style.top = Math.max(0, Math.min(bt.offsetHeight, r.y + u.top - o.top)) + "px", C.style.left = Math.max(0, Math.min(bt.offsetWidth, r.x + u.left - o.left)) + "px";
            if (e) B.style.top = r.y + "px", B.style.left = (s.lineWrapping ? Math.min(r.x, K.offsetWidth) : r.x) + "px", B.style.display = "", H.style.display = "none";
            else {
                var a = t.y == n.y,
                    f = document.createDocumentFragment(),
                    l = K.clientWidth || K.offsetWidth,
                    c = K.clientHeight || K.offsetHeight,
                    h = function (e, t, n, r) {
                        var i = g ? "width: " + (n ? l - n - e : l) + "px" : "right: " + n + "px";
                        f.appendChild(mt("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; " + i + "; height: " + r + "px"))
                    };
                if (Pt.from.ch && t.y >= 0) {
                    var p = a ? l - n.x : 0;
                    h(t.x, t.y, p, i)
                }
                var d = Math.max(0, t.y + (Pt.from.ch ? i : 0)),
                    v = Math.min(n.y, c) - d;
                v > .2 * i && h(0, d, 0, v), (!a || !Pt.from.ch) && n.y < c - .5 * i && h(0, n.y, l - n.x, i), yt(H, f), B.style.display = "none", H.style.display = ""
            }
        }
        function lr(e) {
            e ? Ht = Ht || (Pt.inverted ? Pt.to : Pt.from) : Ht = null
        }
        function cr(e, t) {
            var n = Ht && mr(Ht);
            n && (dt(n, e) ? e = n : dt(t, n) && (t = n)), hr(e, t), Wt = !0
        }
        function hr(e, t, n, r) {
            on = null, n == null && (n = Pt.from.line, r = Pt.to.line);
            if (pt(Pt.from, e) && pt(Pt.to, t)) return;
            if (dt(t, e)) {
                var i = t;
                t = e, e = i
            }
            if (e.line != n) {
                var o = pr(e, n, Pt.from.ch);
                o ? e = o : Fr(e.line, !1)
            }
            t.line != r && (t = pr(t, r, Pt.to.ch)), pt(e, t) ? Pt.inverted = !1 : pt(e, Pt.to) ? Pt.inverted = !1 : pt(t, Pt.from) && (Pt.inverted = !0);
            if (s.autoClearEmptyLines && pt(Pt.from, Pt.to)) {
                var u = Pt.inverted ? e : t;
                if (u.line != Pt.from.line && Pt.from.line < Mt.size) {
                    var a = dn(Pt.from.line);
                    /^\s+$/.test(a.text) && setTimeout(hi(function () {
                        if (a.parent && /^\s+$/.test(a.text)) {
                            var e = U(a);
                            zn("", {
                                line: e,
                                ch: 0
                            }, {
                                line: e,
                                ch: a.text.length
                            })
                        }
                    }, 10))
                }
            }
            Pt.from = e, Pt.to = t, $t = !0
        }
        function pr(e, t, n) {
            function r(t) {
                var r = e.line + t,
                    i = t == 1 ? Mt.size : -1;
                while (r != i) {
                    var o = dn(r);
                    if (!o.hidden) {
                        var u = e.ch;
                        if (s || u > n || u > o.text.length) u = o.text.length;
                        return {
                            line: r,
                            ch: u
                        }
                    }
                    r += t
                }
            }
            var i = dn(e.line),
                s = e.ch == i.text.length && e.ch != n;
            return i.hidden ? e.line >= t ? r(1) || r(-1) : r(-1) || r(1) : e
        }
        function dr(e, t, n) {
            var r = mr({
                line: e,
                ch: t || 0
            });
            (n ? cr : hr)(r, r)
        }
        function vr(e) {
            return Math.max(0, Math.min(e, Mt.size - 1))
        }
        function mr(e) {
            if (e.line < 0) return {
                line: 0,
                ch: 0
            };
            if (e.line >= Mt.size) return {
                line: Mt.size - 1,
                ch: dn(Mt.size - 1).text.length
            };
            var t = e.ch,
                n = dn(e.line).text.length;
            return t == null || t > n ? {
                line: e.line,
                ch: n
            } : t < 0 ? {
                line: e.line,
                ch: 0
            } : e
        }
        function gr(e, t) {
            function o() {
                for (var t = r + e, n = e < 0 ? -1 : Mt.size; t != n; t += e) {
                    var i = dn(t);
                    if (!i.hidden) return r = t, s = i, !0
                }
            }
            function u(t) {
                if (i == (e < 0 ? 0 : s.text.length)) {
                    if ( !! t || !o()) return !1;
                    i = e < 0 ? s.text.length : 0
                } else i += e;
                return !0
            }
            var n = Pt.inverted ? Pt.from : Pt.to,
                r = n.line,
                i = n.ch,
                s = dn(r);
            if (t == "char") u();
            else if (t == "column") u(!0);
            else if (t == "word") {
                var a = !1;
                for (;;) {
                    if (e < 0 && !u()) break;
                    if (St(s.text.charAt(i))) a = !0;
                    else if (a) {
                        e < 0 && (e = 1, u());
                        break
                    }
                    if (e > 0 && !u()) break
                }
            }
            return {
                line: r,
                ch: i
            }
        }
        function yr(e, t) {
            var n = e < 0 ? Pt.from : Pt.to;
            if (Ht || pt(Pt.from, Pt.to)) n = gr(e, t);
            dr(n.line, n.ch, !0)
        }
        function br(e, t) {
            pt(Pt.from, Pt.to) ? e < 0 ? zn("", gr(e, t), Pt.to) : zn("", Pt.from, gr(e, t)) : zn("", Pt.from, Pt.to), Wt = !0
        }
        function wr(e, t) {
            var n = 0,
                r = Rr(Pt.inverted ? Pt.from : Pt.to, !0);
            on != null && (r.x = on);
            if (t == "page") var i = Math.min(bt.clientHeight, window.innerHeight || document.documentElement.clientHeight),
                s = Ur(r.x, r.y + i * e);
            else if (t == "line") var o = $r(),
                s = Ur(r.x, r.y + .5 * o + e * o);
            t == "page" && (A.scrollTop += Rr(s, !0).y - r.y), dr(s.line, s.ch, !0), on = r.x
        }
        function Er(e) {
            var t = dn(e.line).text,
                n = e.ch,
                r = e.ch;
            if (t) {
                e.after === !1 || r == t.length ? --n : ++r;
                var i = t.charAt(n),
                    s = St(i) ? St : /\s/.test(i) ? function (e) {
                        return /\s/.test(e)
                    } : function (e) {
                        return !/\s/.test(e) && !St(e)
                    };
                while (n > 0 && s(t.charAt(n - 1)))--n;
                while (r < t.length && s(t.charAt(r)))++r
            }
            return {
                from: {
                    line: e.line,
                    ch: n
                },
                to: {
                    line: e.line,
                    ch: r
                }
            }
        }
        function Sr(e) {
            cr({
                line: e,
                ch: 0
            }, mr({
                line: e + 1,
                ch: 0
            }))
        }
        function xr(e) {
            if (pt(Pt.from, Pt.to)) return Tr(Pt.from.line, e);
            var t = Pt.to.line - (Pt.to.ch ? 0 : 1);
            for (var n = Pt.from.line; n <= t; ++n) Tr(n, e)
        }
        function Tr(e, t) {
            t || (t = "add");
            if (t == "smart") if (!Ot.indent) t = "prev";
            else var n = oi(e);
            var r = dn(e),
                i = r.indentation(s.tabSize),
                o = r.text.match(/^\s*/)[0],
                u;
            t == "smart" && (u = Ot.indent(n, r.text.slice(o.length), r.text), u == nt && (t = "prev")), t == "prev" ? e ? u = dn(e - 1).indentation(s.tabSize) : u = 0 : t == "add" ? u = i + s.indentUnit : t == "subtract" && (u = i - s.indentUnit), u = Math.max(0, u);
            var a = u - i,
                f = "",
                l = 0;
            if (s.indentWithTabs) for (var c = Math.floor(u / s.tabSize); c; --c) l += s.tabSize, f += "	";
            l < u && (f += lt(u - l)), f != o && zn(f, {
                line: e,
                ch: 0
            }, {
                line: e,
                ch: o.length
            }), r.stateAfter = null
        }
        function Nr() {
            Ot = e.getMode(s, s.mode), Mt.iter(0, Mt.size, function (e) {
                e.stateAfter = null
            }), _t = 0, ai(100)
        }
        function Cr() {
            var e = s.gutter || s.lineNumbers;
            st.style.display = e ? "" : "none", e ? Jt = !0 : O.parentNode.style.marginLeft = 0
        }
        function kr(e, t) {
            if (s.lineWrapping) {
                Ct.className += " CodeMirror-wrap";
                var n = bt.clientWidth / Qr() - 3;
                Mt.iter(0, Mt.size, function (e) {
                    if (e.hidden) return;
                    var t = Math.ceil(e.text.length / n) || 1;
                    t != 1 && vn(e, t)
                }), K.style.minWidth = j.style.left = ""
            } else Ct.className = Ct.className.replace(" CodeMirror-wrap", ""), Un(), Mt.iter(0, Mt.size, function (e) {
                e.height != 1 && !e.hidden && vn(e, 1)
            });
            Xt.push({
                from: 0,
                to: Mt.size
            })
        }
        function Lr() {
            bt.className = bt.className.replace(/\s*cm-s-\S+/g, "") + s.theme.replace(/(^|\s)\s*/g, " cm-s-")
        }
        function Ar() {
            var e = f[s.keyMap].style;
            Ct.className = Ct.className.replace(/\s*cm-keymap-\S+/g, "") + (e ? " cm-keymap-" + e : "")
        }
        function Or(e, t) {
            this.lines = [], this.type = e, t && (this.style = t)
        }
        function Mr(e, t, n, r) {
            e = mr(e), t = mr(t);
            var i = new Or("range", n);
            if (r) for (var s in r) r.hasOwnProperty(s) && (i[s] = r[s]);
            var o = e.line;
            return Mt.iter(o, t.line + 1, function (n) {
                var r = {
                    from: o == e.line ? e.ch : null,
                    to: o == t.line ? t.ch : null,
                    marker: i
                };
                (n.markedSpans || (n.markedSpans = [])).push(r), i.lines.push(n), ++o
            }), Xt.push({
                from: e.line,
                to: t.line + 1
            }), i
        }
        function _r(e) {
            e = mr(e);
            var t = new Or("bookmark"),
                n = dn(e.line),
                r = {
                    from: e.ch,
                    to: e.ch,
                    marker: t
                };
            return (n.markedSpans || (n.markedSpans = [])).push(r), t.lines.push(n), t
        }
        function Dr(e) {
            e = mr(e);
            var t = [],
                n = dn(e.line).markedSpans;
            if (n) for (var r = 0; r < n.length; ++r) {
                var i = n[r];
                (i.from == null || i.from <= e.ch) && (i.to == null || i.to >= e.ch) && t.push(i.marker)
            }
            return t
        }
        function Pr(e, t, n) {
            return typeof e == "number" && (e = dn(vr(e))), e.gutterMarker = {
                text: t,
                style: n
            }, Jt = !0, e
        }
        function Hr(e) {
            typeof e == "number" && (e = dn(vr(e))), e.gutterMarker = null, Jt = !0
        }
        function Br(e, t) {
            var n = e,
                r = e;
            return typeof e == "number" ? r = dn(vr(e)) : n = U(e), n == null ? null : t(r, n) ? (Xt.push({
                from: n,
                to: n + 1
            }), r) : null
        }
        function jr(e, t, n) {
            return Br(e, function (e) {
                if (e.className != t || e.bgClassName != n) return e.className = t, e.bgClassName = n, !0
            })
        }
        function Fr(e, t) {
            return Br(e, function (e, n) {
                if (e.hidden != t) {
                    e.hidden = t, s.lineWrapping || (t && e.text.length == tn.text.length ? nn = !0 : !t && e.text.length > tn.text.length && (tn = e, nn = !1)), vn(e, t ? 0 : 1);
                    var r = Pt.from.line,
                        i = Pt.to.line;
                    if (t && (r == n || i == n)) {
                        var o = r == n ? pr({
                            line: r,
                            ch: 0
                        }, r, 0) : Pt.from,
                            u = i == n ? pr({
                                line: i,
                                ch: 0
                            }, i, 0) : Pt.to;
                        if (!u) return;
                        hr(o, u)
                    }
                    return Jt = !0
                }
            })
        }
        function Ir(e) {
            if (typeof e == "number") {
                if (!hn(e)) return null;
                var t = e;
                e = dn(e);
                if (!e) return null
            } else {
                var t = U(e);
                if (t == null) return null
            }
            var n = e.gutterMarker;
            return {
                line: t,
                handle: e,
                text: e.text,
                markerText: n && n.text,
                markerClass: n && n.style,
                lineClass: e.className,
                bgClass: e.bgClassName
            }
        }
        function qr(e, t) {
            if (t == 0) return {
                top: 0,
                left: 0
            };
            var n = mn(e, t);
            yt(V, n);
            var r = n.anchor,
                i = r.offsetTop,
                s = r.offsetLeft;
            if (d && i == 0 && s == 0) {
                var o = mt("span", "x");
                r.parentNode.insertBefore(o, r.nextSibling), i = o.offsetTop
            }
            return {
                top: i,
                left: s
            }
        }
        function Rr(e, t) {
            var n, r = $r(),
                i = r * (W(Mt, e.line) - (t ? Qt : 0));
            if (e.ch == 0) n = 0;
            else {
                var o = qr(dn(e.line), e.ch);
                n = o.left, s.lineWrapping && (i += Math.max(0, o.top))
            }
            return {
                x: n,
                y: i,
                yBot: i + r
            }
        }
        function Ur(e, t) {
            function h(e) {
                var t = qr(u, e);
                if (f) {
                    var r = Math.round(t.top / n);
                    return c = r != l, Math.max(0, t.left + (r - l) * bt.clientWidth)
                }
                return t.left
            }
            var n = $r(),
                r = Qr(),
                i = Qt + Math.floor(t / n);
            if (i < 0) return {
                line: 0,
                ch: 0
            };
            var o = z(Mt, i);
            if (o >= Mt.size) return {
                line: Mt.size - 1,
                ch: dn(Mt.size - 1).text.length
            };
            var u = dn(o),
                a = u.text,
                f = s.lineWrapping,
                l = f ? i - W(Mt, o) : 0;
            if (e <= 0 && l == 0) return {
                line: o,
                ch: 0
            };
            var c = !1,
                p = 0,
                d = 0,
                v = a.length,
                m, g = Math.min(v, Math.ceil((e + l * bt.clientWidth * .9) / r));
            for (;;) {
                var y = h(g);
                if (!(y <= e && g < v)) {
                    m = y, v = g;
                    break
                }
                g = Math.min(v, Math.ceil(g * 1.2))
            }
            if (e > m) return {
                line: o,
                ch: v
            };
            g = Math.floor(v * .8), y = h(g), y < e && (p = g, d = y);
            for (;;) {
                if (v - p <= 1) {
                    var b = e - d < m - e;
                    return {
                        line: o,
                        ch: b ? p : v,
                        after: b
                    }
                }
                var w = Math.ceil((p + v) / 2),
                    E = h(w);
                E > e ? (v = w, m = E, c && (m += 1e3)) : (p = w, d = E)
            }
        }
        function zr(e) {
            var t = Rr(e, !0),
                n = ut(K);
            return {
                x: n.left + t.x,
                y: n.top + t.y,
                yBot: n.top + t.yBot
            }
        }
        function $r() {
            if (Vr == null) {
                Vr = mt("pre");
                for (var e = 0; e < 49; ++e) Vr.appendChild(document.createTextNode("x")), Vr.appendChild(mt("br"));
                Vr.appendChild(document.createTextNode("x"))
            }
            var t = O.clientHeight;
            return t == Xr ? Wr : (Xr = t, yt(V, Vr.cloneNode(!0)), Wr = V.firstChild.offsetHeight / 50 || 1, gt(V), Wr)
        }
        function Qr() {
            if (bt.clientWidth == Kr) return Jr;
            Kr = bt.clientWidth;
            var e = mt("span", "x"),
                t = mt("pre", [e]);
            return yt(V, t), Jr = e.offsetWidth || 10
        }
        function Gr() {
            return K.offsetTop
        }
        function Yr() {
            return K.offsetLeft
        }
        function Zr(e, t) {
            var n = ut(bt, !0),
                r, i;
            try {
                r = e.clientX, i = e.clientY
            } catch (e) {
                return null
            }
            if (!t && (r - n.left > bt.clientWidth || i - n.top > bt.clientHeight)) return null;
            var s = ut(K, !0);
            return Ur(r - s.left, i - s.top)
        }
        function ti(e) {
            function i() {
                C.style.position = "relative", E.style.cssText = r, m && (A.scrollTop = n), Jn();
                if (E.selectionStart != null) {
                    clearTimeout(ei);
                    var e = E.value = " " + (pt(Pt.from, Pt.to) ? "" : E.value),
                        t = 0;
                    Qn = " ", E.selectionStart = 1, E.selectionEnd = e.length, ei = setTimeout(function i() {
                        Qn == " " && E.selectionStart == 0 ? hi(a.selectAll)(pn) : t++ < 10 ? ei = setTimeout(i, 500) : Yn()
                    }, 200)
                }
            }
            var t = Zr(e),
                n = A.scrollTop;
            if (!t || w) return;
            (pt(Pt.from, Pt.to) || dt(t, Pt.from) || !dt(t, Pt.to)) && hi(dr)(t.line, t.ch);
            var r = E.style.cssText;
            C.style.position = "absolute", E.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: white; " + "border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", Zn(), Yn(!0), pt(Pt.from, Pt.to) && (E.value = Qn = " ");
            if (p) {
                Q(e);
                var s = et(window, "mouseup", function () {
                    s(), setTimeout(i, 20)
                }, !0)
            } else setTimeout(i, 50)
        }
        function ni() {
            clearInterval(At);
            var e = !0;
            B.style.visibility = "", At = setInterval(function () {
                B.style.visibility = (e = !e) ? "" : "hidden"
            }, s.cursorBlinkRate)
        }
        function ii(e) {
            function v(e, t, n) {
                if (!e.text) return;
                var r = e.styles,
                    i = o ? 0 : e.text.length - 1,
                    s;
                for (var a = o ? 0 : r.length - 2, f = o ? r.length : -2; a != f; a += 2 * u) {
                    var l = r[a];
                    if (r[a + 1] != h) {
                        i += u * l.length;
                        continue
                    }
                    for (var c = o ? 0 : l.length - 1, v = o ? l.length : -1; c != v; c += u, i += u) if (i >= t && i < n && d.test(s = l.charAt(c))) {
                        var m = ri[s];
                        if (m.charAt(1) == ">" == o) p.push(s);
                        else {
                            if (p.pop() != m.charAt(0)) return {
                                pos: i,
                                match: !1
                            };
                            if (!p.length) return {
                                pos: i,
                                match: !0
                            }
                        }
                    }
                }
            }
            var t = Pt.inverted ? Pt.from : Pt.to,
                n = dn(t.line),
                r = t.ch - 1,
                i = r >= 0 && ri[n.text.charAt(r)] || ri[n.text.charAt(++r)];
            if (!i) return;
            var s = i.charAt(0),
                o = i.charAt(1) == ">",
                u = o ? 1 : -1,
                a = n.styles;
            for (var f = r + 1, l = 0, c = a.length; l < c; l += 2) if ((f -= a[l].length) <= 0) {
                var h = a[l + 1];
                break
            }
            var p = [n.text.charAt(r)],
                d = /[(){}[\]]/;
            for (var l = t.line, c = o ? Math.min(l + 100, Mt.size) : Math.max(-1, l - 100); l != c; l += u) {
                var n = dn(l),
                    m = l == t.line,
                    g = v(n, m && o ? r + 1 : 0, m && !o ? r : n.text.length);
                if (g) break
            }
            g || (g = {
                pos: null,
                match: !1
            });
            var h = g.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket",
                y = Mr({
                    line: t.line,
                    ch: r
                }, {
                    line: t.line,
                    ch: r + 1
                }, h),
                b = g.pos != null && Mr({
                    line: l,
                    ch: g.pos
                }, {
                    line: l,
                    ch: g.pos + 1
                }, h),
                w = hi(function () {
                    y.clear(), b && b.clear()
                });
            e ? setTimeout(w, 800) : en = w
        }
        function si(e) {
            var t, n;
            for (var r = e, i = e - 40; r > i; --r) {
                if (r == 0) return 0;
                var o = dn(r - 1);
                if (o.stateAfter) return r;
                var u = o.indentation(s.tabSize);
                if (n == null || t > u) n = r - 1, t = u
            }
            return n
        }
        function oi(e) {
            var t = si(e),
                n = t && dn(t - 1).stateAfter;
            return n ? n = T(Ot, n) : n = N(Ot), Mt.iter(t, e, function (r) {
                r.process(Ot, n, s.tabSize), r.stateAfter = t == e - 1 || t % 5 == 0 ? T(Ot, n) : null
            }), n
        }
        function ui() {
            if (_t >= Yt) return;
            var e = +(new Date) + s.workTime,
                t = T(Ot, oi(_t)),
                n = _t;
            Mt.iter(_t, Yt, function (n) {
                _t >= Gt ? (n.highlight(Ot, t, s.tabSize), n.stateAfter = T(Ot, t)) : (n.process(Ot, t, s.tabSize), n.stateAfter = _t % 5 == 0 ? T(Ot, t) : null), ++_t;
                if (+(new Date) > e) return ai(s.workDelay), !0
            }), Yt > n && _t >= Gt && hi(function () {
                Xt.push({
                    from: n,
                    to: _t
                })
            })()
        }
        function ai(e) {
            _t < Yt && Lt.set(e, ui)
        }
        function fi() {
            zt = Wt = Vt = null, Xt = [], $t = !1, Kt = []
        }
        function li() {
            nn && Un();
            if (rn && !s.lineWrapping) {
                var e = j.offsetWidth,
                    t = qr(tn, tn.text.length).left;
                v || (j.style.left = t + "px", K.style.minWidth = t + e + "px"), rn = !1
            }
            var n, r;
            if ($t) {
                var i = tr();
                n = rr(i.x, i.y, i.x, i.yBot)
            }
            if (Xt.length || n && n.scrollTop != null) r = sr(Xt, !0, n && n.scrollTop);
            r || ($t && fr(), Jt && ar()), n && er(), $t && ni(), Dt && (zt === !0 || zt !== !1 && $t) && Yn(Wt), $t && s.matchBrackets && setTimeout(hi(function () {
                en && (en(), en = null), pt(Pt.from, Pt.to) && ii(!1)
            }), 20);
            var o = $t,
                u = Kt;
            Vt && s.onChange && pn && s.onChange(pn, Vt), o && s.onCursorActivity && s.onCursorActivity(pn);
            for (var a = 0; a < u.length; ++a) u[a](pn);
            r && s.onUpdate && s.onUpdate(pn)
        }
        function hi(e) {
            return function () {
                ci++ || fi();
                try {
                    var t = e.apply(this, arguments)
                } finally {
                    --ci || li()
                }
                return t
            }
        }
        function pi(e) {
            un.startCompound();
            try {
                return e()
            } finally {
                un.endCompound()
            }
        }
        var s = {}, u = e.defaults;
        for (var b in u) u.hasOwnProperty(b) && (s[b] = (i && i.hasOwnProperty(b) ? i : u)[b]);
        var E = mt("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em");
        E.setAttribute("wrap", "off"), E.setAttribute("autocorrect", "off"), E.setAttribute("autocapitalize", "off");
        var C = mt("div", [E], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"),
            k = mt("div", null, "CodeMirror-scrollbar-inner"),
            A = mt("div", [k], "CodeMirror-scrollbar"),
            O = mt("div"),
            H = mt("div", null, null, "position: relative; z-index: -1"),
            B = mt("pre", "\u00a0", "CodeMirror-cursor"),
            j = mt("pre", "\u00a0", "CodeMirror-cursor", "visibility: hidden"),
            V = mt("div", null, null, "position: absolute; width: 100%; height: 0px; overflow: hidden; visibility: hidden;"),
            K = mt("div", [V, B, j, H, O], null, "position: relative; z-index: 0"),
            it = mt("div", null, "CodeMirror-gutter-text"),
            st = mt("div", [it], "CodeMirror-gutter"),
            ot = mt("div", [st, mt("div", [K], "CodeMirror-lines")], null, "position: relative"),
            ft = mt("div", [ot], null, "position: relative"),
            bt = mt("div", [ft], "CodeMirror-scroll");
        bt.setAttribute("tabIndex", "-1");
        var Ct = mt("div", [C, A, bt], "CodeMirror" + (s.lineWrapping ? " CodeMirror-wrap" : ""));
        r.appendChild ? r.appendChild(Ct) : r(Ct), Lr(), Ar(), t && (E.style.width = "0px"), y || (bt.draggable = !0), K.style.outline = "none", s.tabindex != null && (E.tabIndex = s.tabindex), s.autofocus && Zn(), !s.gutter && !s.lineNumbers && (st.style.display = "none"), S && (C.style.height = "1px", C.style.position = "absolute"), x ? (A.style.zIndex = -2, A.style.visibility = "hidden") : v && (A.style.minWidth = "18px");
        var kt = new tt,
            Lt = new tt,
            At, Ot, Mt = new q([new I([new F("")])]),
            _t = 0,
            Dt;
        Nr();
        var Pt = {
            from: {
                line: 0,
                ch: 0
            },
            to: {
                line: 0,
                ch: 0
            },
            inverted: !1
        }, Ht, Bt, jt, Ft = 0,
            It, qt = !1,
            Rt = !1,
            Ut = !1,
            zt, Wt, Xt, Vt, $t, Jt, Kt, Qt = 0,
            Gt = 0,
            Yt = 0,
            Zt = 0,
            en, tn = dn(0),
            nn = !1,
            rn = !0,
            sn = !1,
            on = null;
        hi(function () {
            gn(s.value || ""), zt = !1
        })();
        var un = new X;
        et(bt, "mousedown", hi(En)), et(bt, "dblclick", hi(Sn)), et(K, "selectstart", J), p || et(bt, "contextmenu", ti), et(bt, "scroll", wn), et(A, "scroll", bn), et(A, "mousedown", function () {
            Dt && setTimeout(Zn, 0)
        });
        var an = et(window, "resize", function () {
            Ct.parentNode ? sr(!0) : an()
        }, !0);
        et(E, "keyup", hi(_n)), et(E, "input", Kn), et(E, "keydown", hi(On)), et(E, "keypress", hi(Mn)), et(E, "focus", Dn), et(E, "blur", Pn), s.dragDrop && (et(bt, "dragstart", Tn), et(bt, "dragenter", fn), et(bt, "dragover", fn), et(bt, "drop", hi(xn))), et(bt, "paste", function () {
            Zn(), Kn()
        }), et(E, "paste", function () {
            Ut = !0, Kn()
        }), et(E, "cut", hi(function () {
            s.readOnly || Wn("")
        })), S && et(ft, "mouseup", function () {
            document.activeElement == E && E.blur(), Zn()
        });
        var ln;
        try {
            ln = document.activeElement == E
        } catch (cn) {}
        ln || s.autofocus ? setTimeout(Dn, 20) : Pn();
        var pn = Ct.CodeMirror = {
            getValue: yn,
            setValue: hi(gn),
            getSelection: $n,
            replaceSelection: hi(Wn),
            focus: function () {
                window.focus(), Zn(), Dn(), Kn()
            },
            setOption: function (e, t) {
                var n = s[e];
                s[e] = t, e == "mode" || e == "indentUnit" ? Nr() : e == "readOnly" && t == "nocursor" ? (Pn(), E.blur()) : e == "readOnly" && !t ? Yn(!0) : e == "theme" ? Lr() : e == "lineWrapping" && n != t ? hi(kr)() : e == "tabSize" ? sr(!0) : e == "keyMap" ? Ar() : e == "tabindex" && (E.tabIndex = t);
                if (e == "lineNumbers" || e == "gutter" || e == "firstLineNumber" || e == "theme" || e == "lineNumberFormatter") Cr(), sr(!0)
            },
            getOption: function (e) {
                return s[e]
            },
            getMode: function () {
                return Ot
            },
            undo: hi(jn),
            redo: hi(Fn),
            indentLine: hi(function (e, t) {
                typeof t != "string" && (t == null ? t = s.smartIndent ? "smart" : "prev" : t = t ? "add" : "subtract"), hn(e) && Tr(e, t)
            }),
            indentSelection: hi(xr),
            historySize: function () {
                return {
                    undo: un.done.length,
                    redo: un.undone.length
                }
            },
            clearHistory: function () {
                un = new X
            },
            setHistory: function (e) {
                un = new X, un.done = e.done, un.undone = e.undone
            },
            getHistory: function () {
                function e(e) {
                    for (var t = 0, n = [], r; t < e.length; ++t) {
                        n.push(r = []);
                        for (var i = 0, s = e[t]; i < s.length; ++i) {
                            var o = [],
                                u = s[i];
                            r.push({
                                start: u.start,
                                added: u.added,
                                old: o
                            });
                            for (var a = 0; a < u.old.length; ++a) o.push(_(u.old[a]))
                        }
                    }
                    return n
                }
                return {
                    done: e(un.done),
                    undone: e(un.undone)
                }
            },
            matchBrackets: hi(function () {
                ii(!0)
            }),
            getTokenAt: hi(function (e) {
                return e = mr(e), dn(e.line).getTokenAt(Ot, oi(e.line), s.tabSize, e.ch)
            }),
            getStateAfter: function (e) {
                return e = vr(e == null ? Mt.size - 1 : e), oi(e + 1)
            },
            cursorCoords: function (e, t) {
                return e == null && (e = Pt.inverted), this.charCoords(e ? Pt.from : Pt.to, t)
            },
            charCoords: function (e, t) {
                return e = mr(e), t == "local" ? Rr(e, !1) : t == "div" ? Rr(e, !0) : zr(e)
            },
            coordsChar: function (e) {
                var t = ut(K);
                return Ur(e.x - t.left, e.y - t.top)
            },
            markText: hi(Mr),
            setBookmark: _r,
            findMarksAt: Dr,
            setMarker: hi(Pr),
            clearMarker: hi(Hr),
            setLineClass: hi(jr),
            hideLine: hi(function (e) {
                return Fr(e, !0)
            }),
            showLine: hi(function (e) {
                return Fr(e, !1)
            }),
            onDeleteLine: function (e, t) {
                if (typeof e == "number") {
                    if (!hn(e)) return null;
                    e = dn(e)
                }
                return (e.handlers || (e.handlers = [])).push(t), e
            },
            lineInfo: Ir,
            getViewport: function () {
                return {
                    from: Gt,
                    to: Yt
                }
            },
            addWidget: function (e, t, n, r, i) {
                e = Rr(mr(e));
                var s = e.yBot,
                    o = e.x;
                t.style.position = "absolute", ft.appendChild(t);
                if (r == "over") s = e.y;
                else if (r == "near") {
                    var u = Math.max(bt.offsetHeight, Mt.height * $r()),
                        a = Math.max(ft.clientWidth, K.clientWidth) - Yr();
                    e.yBot + t.offsetHeight > u && e.y > t.offsetHeight && (s = e.y - t.offsetHeight), o + t.offsetWidth > a && (o = a - t.offsetWidth)
                }
                t.style.top = s + Gr() + "px", t.style.left = t.style.right = "", i == "right" ? (o = ft.clientWidth - t.offsetWidth, t.style.right = "0px") : (i == "left" ? o = 0 : i == "middle" && (o = (ft.clientWidth - t.offsetWidth) / 2), t.style.left = o + Yr() + "px"), n && nr(o, s, o + t.offsetWidth, s + t.offsetHeight)
            },
            lineCount: function () {
                return Mt.size
            },
            clipPos: mr,
            getCursor: function (e) {
                return e == null && (e = Pt.inverted), vt(e ? Pt.from : Pt.to)
            },
            somethingSelected: function () {
                return !pt(Pt.from, Pt.to)
            },
            setCursor: hi(function (e, t, n) {
                t == null && typeof e.line == "number" ? dr(e.line, e.ch, n) : dr(e, t, n)
            }),
            setSelection: hi(function (e, t, n) {
                (n ? cr : hr)(mr(e), mr(t || e))
            }),
            getLine: function (e) {
                if (hn(e)) return dn(e).text
            },
            getLineHandle: function (e) {
                if (hn(e)) return dn(e)
            },
            setLine: hi(function (e, t) {
                hn(e) && zn(t, {
                    line: e,
                    ch: 0
                }, {
                    line: e,
                    ch: dn(e).text.length
                })
            }),
            removeLine: hi(function (e) {
                hn(e) && zn("", {
                    line: e,
                    ch: 0
                }, mr({
                    line: e + 1,
                    ch: 0
                }))
            }),
            replaceRange: hi(zn),
            getRange: function (e, t, n) {
                return Vn(mr(e), mr(t), n)
            },
            triggerOnKeyDown: hi(On),
            execCommand: function (e) {
                return a[e](pn)
            },
            moveH: hi(yr),
            deleteH: hi(br),
            moveV: hi(wr),
            toggleOverwrite: function () {
                qt ? (qt = !1, B.className = B.className.replace(" CodeMirror-overwrite", "")) : (qt = !0, B.className += " CodeMirror-overwrite")
            },
            posFromIndex: function (e) {
                var t = 0,
                    n;
                return Mt.iter(0, Mt.size, function (r) {
                    var i = r.text.length + 1;
                    if (i > e) return n = e, !0;
                    e -= i, ++t
                }), mr({
                    line: t,
                    ch: n
                })
            },
            indexFromPos: function (e) {
                if (e.line < 0 || e.ch < 0) return 0;
                var t = e.ch;
                return Mt.iter(0, e.line, function (e) {
                    t += e.text.length + 1
                }), t
            },
            scrollTo: function (e, t) {
                e != null && (bt.scrollLeft = e), t != null && (A.scrollTop = bt.scrollTop = t), sr([])
            },
            getScrollInfo: function () {
                return {
                    x: bt.scrollLeft,
                    y: A.scrollTop,
                    height: A.scrollHeight,
                    width: bt.scrollWidth
                }
            },
            setSize: function (e, t) {
                function n(e) {
                    return e = String(e), /^\d+$/.test(e) ? e + "px" : e
                }
                e != null && (Ct.style.width = n(e)), t != null && (bt.style.height = n(t)), pn.refresh()
            },
            operation: function (e) {
                return hi(e)()
            },
            compoundChange: function (e) {
                return pi(e)
            },
            refresh: function () {
                sr(!0, null, Ft), A.scrollHeight > Ft && (A.scrollTop = Ft)
            },
            getInputField: function () {
                return E
            },
            getWrapperElement: function () {
                return Ct
            },
            getScrollerElement: function () {
                return bt
            },
            getGutterElement: function () {
                return st
            }
        }, Cn, An = null,
            Qn = "";
        Or.prototype.clear = hi(function () {
            var e = Infinity,
                t = -Infinity;
            for (var n = 0; n < this.lines.length; ++n) {
                var r = this.lines[n],
                    i = L(r.markedSpans, this, !0);
                if (i.from != null || i.to != null) {
                    var s = U(r);
                    e = Math.min(e, s), t = Math.max(t, s)
                }
            }
            e != Infinity && Xt.push({
                from: e,
                to: t + 1
            }), this.lines.length = 0
        }), Or.prototype.find = function () {
            var e, t;
            for (var n = 0; n < this.lines.length; ++n) {
                var r = this.lines[n],
                    i = L(r.markedSpans, this);
                if (i.from != null || i.to != null) {
                    var s = U(r);
                    i.from != null && (e = {
                        line: s,
                        ch: i.from
                    }), i.to != null && (t = {
                        line: s,
                        ch: i.to
                    })
                }
            }
            return this.type == "bookmark" ? e : e && {
                from: e,
                to: t
            }
        };
        var Wr, Xr, Vr, Jr, Kr = 0,
            ei, ri = {
                "(": ")>",
                ")": "(<",
                "[": "]>",
                "]": "[<",
                "{": "}>",
                "}": "{<"
            }, ci = 0;
        for (var di in o) o.propertyIsEnumerable(di) && !pn.propertyIsEnumerable(di) && (pn[di] = o[di]);
        return pn
    }
    function l(e) {
        return typeof e == "string" ? f[e] : e
    }
    function c(e, t, n, r, i) {
        function s(t) {
            t = l(t);
            var n = t[e];
            if (n === !1) return i && i(), !0;
            if (n != null && r(n)) return !0;
            if (t.nofallthrough) return i && i(), !0;
            var o = t.fallthrough;
            if (o == null) return !1;
            if (Object.prototype.toString.call(o) != "[object Array]") return s(o);
            for (var u = 0, a = o.length; u < a; ++u) if (s(o[u])) return !0;
            return !1
        }
        return t && s(t) ? !0 : s(n)
    }
    function h(e) {
        var t = Nt[Z(e, "keyCode")];
        return t == "Ctrl" || t == "Alt" || t == "Shift" || t == "Mod"
    }
    function T(e, t) {
        if (t === !0) return t;
        if (e.copyState) return e.copyState(t);
        var n = {};
        for (var r in t) {
            var i = t[r];
            i instanceof Array && (i = i.concat([])), n[r] = i
        }
        return n
    }
    function N(e, t, n) {
        return e.startState ? e.startState(t, n) : !0
    }
    function C(e, t) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8
    }
    function k(e, t, n) {
        this.from = e, this.to = t, this.marker = n
    }
    function L(e, t, n) {
        if (e) for (var r = 0; r < e.length; ++r) {
            var i = e[r];
            if (i.marker == t) return n && e.splice(r, 1), i
        }
    }
    function A(e, t, n) {
        if (e) for (var r = 0, i; r < e.length; ++r) {
            var s = e[r],
                o = s.marker,
                u = s.from == null || (o.inclusiveLeft ? s.from <= t : s.from < t);
            if (u || o.type == "bookmark" && s.from == t && s.from != n) {
                var a = s.to == null || (o.inclusiveRight ? s.to >= t : s.to > t);
                (i || (i = [])).push({
                    from: s.from,
                    to: a ? null : s.to,
                    marker: o
                })
            }
        }
        return i
    }
    function O(e, t) {
        if (e) for (var n = 0, r; n < e.length; ++n) {
            var i = e[n],
                s = i.marker,
                o = i.to == null || (s.inclusiveRight ? i.to >= t : i.to > t);
            if (o || s.type == "bookmark" && i.from == t) {
                var u = i.from == null || (s.inclusiveLeft ? i.from <= t : i.from < t);
                (r || (r = [])).push({
                    from: u ? null : i.from - t,
                    to: i.to == null ? null : i.to - t,
                    marker: s
                })
            }
        }
        return r
    }
    function M(e, t, n, r, i) {
        if (!e && !t) return i;
        var s = A(e, n),
            o = O(t, r),
            u = i.length == 1,
            a = ct(i).length + (u ? n : 0);
        if (s) for (var f = 0; f < s.length; ++f) {
            var l = s[f];
            if (l.to == null) {
                var c = L(o, l.marker);
                c ? u && (l.to = c.to == null ? null : c.to + a) : l.to = n
            }
        }
        if (o) for (var f = 0; f < o.length; ++f) {
            var l = o[f];
            l.to != null && (l.to += a);
            if (l.from == null) {
                var c = L(s, l.marker);
                c || (l.from = a, u && (s || (s = [])).push(l))
            } else l.from += a, u && (s || (s = [])).push(l)
        }
        var h = [P(i[0], s)];
        if (!u) {
            var p = i.length - 2,
                d;
            if (p > 0 && s) for (var f = 0; f < s.length; ++f) s[f].to == null && (d || (d = [])).push({
                from: null,
                to: null,
                marker: s[f].marker
            });
            for (var f = 0; f < p; ++f) h.push(P(i[f + 1], d));
            h.push(P(ct(i), o))
        }
        return h
    }
    function _(e) {
        return typeof e == "string" ? e : e.text
    }
    function D(e) {
        return typeof e == "string" ? null : e.markedSpans
    }
    function P(e, t) {
        return t ? {
            text: e,
            markedSpans: t
        } : e
    }
    function H(e) {
        var t = e.markedSpans;
        if (!t) return;
        for (var n = 0; n < t.length; ++n) {
            var r = t[n].marker.lines,
                i = Et(r, e);
            r.splice(i, 1)
        }
        e.markedSpans = null
    }
    function B(e, t) {
        if (!t) return;
        for (var n = 0; n < t.length; ++n) var r = t[n].marker.lines.push(e);
        e.markedSpans = t
    }
    function F(e, t) {
        this.text = e, this.height = 1, B(this, t)
    }
    function I(e) {
        this.lines = e, this.parent = null;
        for (var t = 0, n = e.length, r = 0; t < n; ++t) e[t].parent = this, r += e[t].height;
        this.height = r
    }
    function q(e) {
        this.children = e;
        var t = 0,
            n = 0;
        for (var r = 0, i = e.length; r < i; ++r) {
            var s = e[r];
            t += s.chunkSize(), n += s.height, s.parent = this
        }
        this.size = t, this.height = n, this.parent = null
    }
    function R(e, t) {
        while (!e.lines) for (var n = 0;; ++n) {
            var r = e.children[n],
                i = r.chunkSize();
            if (t < i) {
                e = r;
                break
            }
            t -= i
        }
        return e.lines[t]
    }
    function U(e) {
        if (e.parent == null) return null;
        var t = e.parent,
            n = Et(t.lines, e);
        for (var r = t.parent; r; t = r, r = r.parent) for (var i = 0, s = r.children.length;; ++i) {
            if (r.children[i] == t) break;
            n += r.children[i].chunkSize()
        }
        return n
    }
    function z(e, t) {
        var n = 0;
        e: do {
            for (var r = 0, i = e.children.length; r < i; ++r) {
                var s = e.children[r],
                    o = s.height;
                if (t < o) {
                    e = s;
                    continue e
                }
                t -= o, n += s.chunkSize()
            }
            return n
        } while (!e.lines);
        for (var r = 0, i = e.lines.length; r < i; ++r) {
            var u = e.lines[r],
                a = u.height;
            if (t < a) break;
            t -= a
        }
        return n + r
    }
    function W(e, t) {
        var n = 0;
        e: do {
            for (var r = 0, i = e.children.length; r < i; ++r) {
                var s = e.children[r],
                    o = s.chunkSize();
                if (t < o) {
                    e = s;
                    continue e
                }
                t -= o, n += s.height
            }
            return n
        } while (!e.lines);
        for (var r = 0; r < t; ++r) n += e.lines[r].height;
        return n
    }
    function X() {
        this.time = 0, this.done = [], this.undone = [], this.compound = 0, this.closed = !1
    }
    function V() {
        Q(this)
    }
    function $(e) {
        return e.stop || (e.stop = V), e
    }
    function J(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }
    function K(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
    }
    function Q(e) {
        J(e), K(e)
    }
    function G(e) {
        return e.target || e.srcElement
    }
    function Y(e) {
        var t = e.which;
        return t == null && (e.button & 1 ? t = 1 : e.button & 2 ? t = 3 : e.button & 4 && (t = 2)), n && e.ctrlKey && t == 1 && (t = 3), t
    }
    function Z(e, t) {
        var n = e.override && e.override.hasOwnProperty(t);
        return n ? e.override[t] : e[t]
    }
    function et(e, t, n, r) {
        if (typeof e.addEventListener == "function") {
            e.addEventListener(t, n, !1);
            if (r) return function () {
                e.removeEventListener(t, n, !1)
            }
        } else {
            var i = function (e) {
                n(e || window.event)
            };
            e.attachEvent("on" + t, i);
            if (r) return function () {
                e.detachEvent("on" + t, i)
            }
        }
    }
    function tt() {
        this.id = null
    }
    function ot(e, t, n) {
        t == null && (t = e.search(/[^\s\u00a0]/), t == -1 && (t = e.length));
        for (var r = 0, i = 0; r < t; ++r) e.charAt(r) == "	" ? i += n - i % n : ++i;
        return i
    }
    function ut(e, t) {
        try {
            var n = e.getBoundingClientRect();
            n = {
                top: n.top,
                left: n.left
            }
        } catch (r) {
            n = {
                top: 0,
                left: 0
            }
        }
        if (!t) if (window.pageYOffset == null) {
            var i = document.documentElement || document.body.parentNode;
            i.scrollTop == null && (i = document.body), n.top += i.scrollTop, n.left += i.scrollLeft
        } else n.top += window.pageYOffset, n.left += window.pageXOffset;
        return n
    }
    function at(e) {
        return e.textContent || e.innerText || e.nodeValue || ""
    }
    function lt(e) {
        while (ft.length <= e) ft.push(ct(ft) + " ");
        return ft[e]
    }
    function ct(e) {
        return e[e.length - 1]
    }
    function ht(e) {
        t ? (e.selectionStart = 0, e.selectionEnd = e.value.length) : e.select()
    }
    function pt(e, t) {
        return e.line == t.line && e.ch == t.ch
    }
    function dt(e, t) {
        return e.line < t.line || e.line == t.line && e.ch < t.ch
    }
    function vt(e) {
        return {
            line: e.line,
            ch: e.ch
        }
    }
    function mt(e, t, n, r) {
        var i = document.createElement(e);
        n && (i.className = n), r && (i.style.cssText = r);
        if (typeof t == "string") bt(i, t);
        else if (t) for (var s = 0; s < t.length; ++s) i.appendChild(t[s]);
        return i
    }
    function gt(e) {
        return e.innerHTML = "", e
    }
    function yt(e, t) {
        gt(e).appendChild(t)
    }
    function bt(e, t) {
        m ? (e.innerHTML = "", e.appendChild(document.createTextNode(t))) : e.textContent = t
    }
    function wt(e, t) {
        if (!t) return 0;
        if (!e) return t.length;
        for (var n = e.length, r = t.length; n >= 0 && r >= 0; --n, --r) if (e.charAt(n) != t.charAt(r)) break;
        return r + 1
    }
    function Et(e, t) {
        if (e.indexOf) return e.indexOf(t);
        for (var n = 0, r = e.length; n < r; ++n) if (e[n] == t) return n;
        return -1
    }
    function St(e) {
        return /\w/.test(e) || e.toUpperCase() != e.toLowerCase()
    }
    e.defaults = {
        value: "",
        mode: null,
        theme: "default",
        indentUnit: 2,
        indentWithTabs: !1,
        smartIndent: !0,
        tabSize: 4,
        keyMap: "default",
        extraKeys: null,
        electricChars: !0,
        autoClearEmptyLines: !1,
        onKeyEvent: null,
        onDragEvent: null,
        lineWrapping: !1,
        lineNumbers: !1,
        gutter: !1,
        fixedGutter: !1,
        firstLineNumber: 1,
        readOnly: !1,
        dragDrop: !0,
        onChange: null,
        onCursorActivity: null,
        onViewportChange: null,
        onGutterClick: null,
        onUpdate: null,
        onFocus: null,
        onBlur: null,
        onScroll: null,
        matchBrackets: !1,
        cursorBlinkRate: 530,
        workTime: 100,
        workDelay: 200,
        pollInterval: 100,
        undoDepth: 40,
        tabindex: null,
        autofocus: null,
        lineNumberFormatter: function (e) {
            return e
        }
    };
    var t = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
        n = t || /Mac/.test(navigator.platform),
        r = /Win/.test(navigator.platform),
        i = e.modes = {}, s = e.mimeModes = {};
    e.defineMode = function (t, n) {
        !e.defaults.mode && t != "null" && (e.defaults.mode = t);
        if (arguments.length > 2) {
            n.dependencies = [];
            for (var r = 2; r < arguments.length; ++r) n.dependencies.push(arguments[r])
        }
        i[t] = n
    }, e.defineMIME = function (e, t) {
        s[e] = t
    }, e.resolveMode = function (t) {
        if (typeof t == "string" && s.hasOwnProperty(t)) t = s[t];
        else if (typeof t == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(t)) return e.resolveMode("application/xml");
        return typeof t == "string" ? {
            name: t
        } : t || {
            name: "null"
        }
    }, e.getMode = function (t, n) {
        var n = e.resolveMode(n),
            r = i[n.name];
        if (!r) return e.getMode(t, "text/plain");
        var s = r(t, n);
        if (u.hasOwnProperty(n.name)) {
            var o = u[n.name];
            for (var a in o) o.hasOwnProperty(a) && (s[a] = o[a])
        }
        return s.name = n.name, s
    }, e.listModes = function () {
        var e = [];
        for (var t in i) i.propertyIsEnumerable(t) && e.push(t);
        return e
    }, e.listMIMEs = function () {
        var e = [];
        for (var t in s) s.propertyIsEnumerable(t) && e.push({
            mime: t,
            mode: s[t]
        });
        return e
    };
    var o = e.extensions = {};
    e.defineExtension = function (e, t) {
        o[e] = t
    };
    var u = e.modeExtensions = {};
    e.extendMode = function (e, t) {
        var n = u.hasOwnProperty(e) ? u[e] : u[e] = {};
        for (var r in t) t.hasOwnProperty(r) && (n[r] = t[r])
    };
    var a = e.commands = {
        selectAll: function (e) {
            e.setSelection({
                line: 0,
                ch: 0
            }, {
                line: e.lineCount() - 1
            })
        },
        killLine: function (e) {
            var t = e.getCursor(!0),
                n = e.getCursor(!1),
                r = !pt(t, n);
            !r && e.getLine(t.line).length == t.ch ? e.replaceRange("", t, {
                line: t.line + 1,
                ch: 0
            }) : e.replaceRange("", t, r ? n : {
                line: t.line
            })
        },
        deleteLine: function (e) {
            var t = e.getCursor().line;
            e.replaceRange("", {
                line: t,
                ch: 0
            }, {
                line: t
            })
        },
        undo: function (e) {
            e.undo()
        },
        redo: function (e) {
            e.redo()
        },
        goDocStart: function (e) {
            e.setCursor(0, 0, !0)
        },
        goDocEnd: function (e) {
            e.setSelection({
                line: e.lineCount() - 1
            }, null, !0)
        },
        goLineStart: function (e) {
            e.setCursor(e.getCursor().line, 0, !0)
        },
        goLineStartSmart: function (e) {
            var t = e.getCursor(),
                n = e.getLine(t.line),
                r = Math.max(0, n.search(/\S/));
            e.setCursor(t.line, t.ch <= r && t.ch ? 0 : r, !0)
        },
        goLineEnd: function (e) {
            e.setSelection({
                line: e.getCursor().line
            }, null, !0)
        },
        goLineUp: function (e) {
            e.moveV(-1, "line")
        },
        goLineDown: function (e) {
            e.moveV(1, "line")
        },
        goPageUp: function (e) {
            e.moveV(-1, "page")
        },
        goPageDown: function (e) {
            e.moveV(1, "page")
        },
        goCharLeft: function (e) {
            e.moveH(-1, "char")
        },
        goCharRight: function (e) {
            e.moveH(1, "char")
        },
        goColumnLeft: function (e) {
            e.moveH(-1, "column")
        },
        goColumnRight: function (e) {
            e.moveH(1, "column")
        },
        goWordLeft: function (e) {
            e.moveH(-1, "word")
        },
        goWordRight: function (e) {
            e.moveH(1, "word")
        },
        delCharLeft: function (e) {
            e.deleteH(-1, "char")
        },
        delCharRight: function (e) {
            e.deleteH(1, "char")
        },
        delWordLeft: function (e) {
            e.deleteH(-1, "word")
        },
        delWordRight: function (e) {
            e.deleteH(1, "word")
        },
        indentAuto: function (e) {
            e.indentSelection("smart")
        },
        indentMore: function (e) {
            e.indentSelection("add")
        },
        indentLess: function (e) {
            e.indentSelection("subtract")
        },
        insertTab: function (e) {
            e.replaceSelection("	", "end")
        },
        defaultTab: function (e) {
            e.somethingSelected() ? e.indentSelection("add") : e.replaceSelection("	", "end")
        },
        transposeChars: function (e) {
            var t = e.getCursor(),
                n = e.getLine(t.line);
            t.ch > 0 && t.ch < n.length - 1 && e.replaceRange(n.charAt(t.ch) + n.charAt(t.ch - 1), {
                line: t.line,
                ch: t.ch - 1
            }, {
                line: t.line,
                ch: t.ch + 1
            })
        },
        newlineAndIndent: function (e) {
            e.replaceSelection("\n", "end"), e.indentLine(e.getCursor().line)
        },
        toggleOverwrite: function (e) {
            e.toggleOverwrite()
        }
    }, f = e.keyMap = {};
    f.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharRight",
        Backspace: "delCharLeft",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite"
    }, f.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Alt-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goWordLeft",
        "Ctrl-Right": "goWordRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delWordLeft",
        "Ctrl-Delete": "delWordRight",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        fallthrough: "basic"
    }, f.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goWordLeft",
        "Alt-Right": "goWordRight",
        "Cmd-Left": "goLineStart",
        "Cmd-Right": "goLineEnd",
        "Alt-Backspace": "delWordLeft",
        "Ctrl-Alt-Backspace": "delWordRight",
        "Alt-Delete": "delWordRight",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        fallthrough: ["basic", "emacsy"]
    }, f["default"] = n ? f.macDefault : f.pcDefault, f.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageUp",
        "Shift-Ctrl-V": "goPageDown",
        "Ctrl-D": "delCharRight",
        "Ctrl-H": "delCharLeft",
        "Alt-D": "delWordRight",
        "Alt-Backspace": "delWordLeft",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    }, e.isModifierKey = h, e.fromTextArea = function (t, n) {
        function s() {
            t.value = a.getValue()
        }
        n || (n = {}), n.value = t.value, !n.tabindex && t.tabindex && (n.tabindex = t.tabindex);
        if (n.autofocus == null) {
            var r = document.body;
            try {
                r = document.activeElement
            } catch (i) {}
            n.autofocus = r == t || t.getAttribute("autofocus") != null && r == document.body
        }
        if (t.form) {
            var o = et(t.form, "submit", s, !0);
            if (typeof t.form.submit == "function") {
                var u = t.form.submit;
                t.form.submit = function f() {
                    s(), t.form.submit = u, t.form.submit(), t.form.submit = f
                }
            }
        }
        t.style.display = "none";
        var a = e(function (e) {
            t.parentNode.insertBefore(e, t.nextSibling)
        }, n);
        return a.save = s, a.getTextArea = function () {
            return t
        }, a.toTextArea = function () {
            s(), t.parentNode.removeChild(a.getWrapperElement()), t.style.display = "", t.form && (o(), typeof t.form.submit == "function" && (t.form.submit = u))
        }, a
    };
    var p = /gecko\/\d{7}/i.test(navigator.userAgent),
        d = /MSIE \d/.test(navigator.userAgent),
        v = /MSIE [1-7]\b/.test(navigator.userAgent),
        m = /MSIE [1-8]\b/.test(navigator.userAgent),
        g = d && document.documentMode == 5,
        y = /WebKit\//.test(navigator.userAgent),
        b = /Chrome\//.test(navigator.userAgent),
        w = /Opera\//.test(navigator.userAgent),
        E = /Apple Computer/.test(navigator.vendor),
        S = /KHTML\//.test(navigator.userAgent),
        x = /Mac OS X 10\D([7-9]|\d\d)\D/.test(navigator.userAgent);
    e.copyState = T, e.startState = N, e.innerMode = function (e, t) {
        while (e.innerMode) {
            var n = e.innerMode(t);
            t = n.state, e = n.mode
        }
        return n || {
            mode: e,
            state: t
        }
    }, C.prototype = {
        eol: function () {
            return this.pos >= this.string.length
        },
        sol: function () {
            return this.pos == 0
        },
        peek: function () {
            return this.string.charAt(this.pos) || undefined
        },
        next: function () {
            if (this.pos < this.string.length) return this.string.charAt(this.pos++)
        },
        eat: function (e) {
            var t = this.string.charAt(this.pos);
            if (typeof e == "string") var n = t == e;
            else var n = t && (e.test ? e.test(t) : e(t));
            if (n) return ++this.pos, t
        },
        eatWhile: function (e) {
            var t = this.pos;
            while (this.eat(e));
            return this.pos > t
        },
        eatSpace: function () {
            var e = this.pos;
            while (/[\s\u00a0]/.test(this.string.charAt(this.pos)))++this.pos;
            return this.pos > e
        },
        skipToEnd: function () {
            this.pos = this.string.length
        },
        skipTo: function (e) {
            var t = this.string.indexOf(e, this.pos);
            if (t > -1) return this.pos = t, !0
        },
        backUp: function (e) {
            this.pos -= e
        },
        column: function () {
            return ot(this.string, this.start, this.tabSize)
        },
        indentation: function () {
            return ot(this.string, null, this.tabSize)
        },
        match: function (e, t, n) {
            if (typeof e != "string") {
                var i = this.string.slice(this.pos).match(e);
                return i && i.index > 0 ? null : (i && t !== !1 && (this.pos += i[0].length), i)
            }
            var r = function (e) {
                return n ? e.toLowerCase() : e
            };
            if (r(this.string).indexOf(r(e), this.pos) == this.pos) return t !== !1 && (this.pos += e.length), !0
        },
        current: function () {
            return this.string.slice(this.start, this.pos)
        }
    }, e.StringStream = C;
    var j = " ";
    p || d && !v ? j = "\u200b" : w && (j = ""), F.prototype = {
        update: function (e, t) {
            this.text = e, this.stateAfter = this.styles = null, H(this), B(this, t)
        },
        highlight: function (e, t, n) {
            var r = new C(this.text, n),
                i = this.styles || (this.styles = []),
                s = i.length = 0;
            this.text == "" && e.blankLine && e.blankLine(t);
            while (!r.eol()) {
                var o = e.token(r, t),
                    u = r.current();
                r.start = r.pos, s && i[s - 1] == o ? i[s - 2] += u : u && (i[s++] = u, i[s++] = o);
                if (r.pos > 5e3) {
                    i[s++] = this.text.slice(r.pos), i[s++] = null;
                    break
                }
            }
        },
        process: function (e, t, n) {
            var r = new C(this.text, n);
            this.text == "" && e.blankLine && e.blankLine(t);
            while (!r.eol() && r.pos <= 5e3) e.token(r, t), r.start = r.pos
        },
        getTokenAt: function (e, t, n, r) {
            var i = this.text,
                s = new C(i, n);
            while (s.pos < r && !s.eol()) {
                s.start = s.pos;
                var o = e.token(s, t)
            }
            return {
                start: s.start,
                end: s.pos,
                string: s.current(),
                className: o || null,
                state: t
            }
        },
        indentation: function (e) {
            return ot(this.text, null, e)
        },
        getContent: function (e, t, n) {
            function u(t, n, o) {
                if (!n) return;
                r && d && n.charAt(0) == " " && (n = "\u00a0" + n.slice(1)), r = !1;
                if (!s.test(n)) {
                    i += n.length;
                    var u = document.createTextNode(n)
                } else {
                    var u = document.createDocumentFragment(),
                        a = 0;
                    for (;;) {
                        s.lastIndex = a;
                        var f = s.exec(n),
                            l = f ? f.index - a : n.length - a;
                        l && (u.appendChild(document.createTextNode(n.slice(a, a + l))), i += l);
                        if (!f) break;
                        a += l + 1;
                        if (f[0] == "	") {
                            var c = e - i % e;
                            u.appendChild(mt("span", lt(c), "cm-tab")), i += c
                        } else {
                            var h = mt("span", "\u2022", "cm-invalidchar");
                            h.title = "\\u" + f[0].charCodeAt(0).toString(16), u.appendChild(h), i += 1
                        }
                    }
                }
                o ? t.appendChild(mt("span", [u], o)) : t.appendChild(u)
            }
            function g(e) {
                return e ? "cm-" + e.replace(/ +/g, " cm-") : null
            }
            var r = !0,
                i = 0,
                s = /[\t\u0000-\u0019\u200b\u2028\u2029\uFEFF]/g,
                o = mt("pre"),
                a = u;
            if (t != null) {
                var f = 0,
                    l = o.anchor = mt("span");
                a = function (e, r, i) {
                    var s = r.length;
                    if (t >= f && t < f + s) {
                        var o = t - f;
                        if (o) {
                            u(e, r.slice(0, o), i);
                            if (n) {
                                var c = r.slice(o - 1, o + 1);
                                st.test(c) ? e.appendChild(mt("wbr")) : !v && /\w\w/.test(c) && e.appendChild(document.createTextNode("\u200d"))
                            }
                        }
                        e.appendChild(l), u(l, w ? r.slice(o, o + 1) : r.slice(o), i), w && u(e, r.slice(o + 1), i), t--, f += s
                    } else f += s, u(e, r, i), f == t && f == m ? (bt(l, j), e.appendChild(l)) : f > t + 10 && /\s/.test(r) && (a = function () {})
                }
            }
            var c = this.styles,
                h = this.text,
                p = this.markedSpans,
                m = h.length;
            if (!h && t == null) a(o, " ");
            else if (!p || !p.length) for (var y = 0, b = 0; b < m; y += 2) {
                var E = c[y],
                    S = c[y + 1],
                    x = E.length;
                b + x > m && (E = E.slice(0, m - b)), b += x, a(o, E, g(S))
            } else {
                p.sort(function (e, t) {
                    return e.from - t.from
                });
                var T = 0,
                    y = 0,
                    N = "",
                    S, C = 0,
                    k = p[0].from || 0,
                    L = [],
                    A = 0,
                    O = function () {
                        var e;
                        while (A < p.length && ((e = p[A]).from == T || e.from == null)) e.marker.type == "range" && L.push(e), ++A;
                        k = A < p.length ? p[A].from : Infinity;
                        for (var t = 0; t < L.length; ++t) {
                            var n = L[t].to;
                            n == null && (n = Infinity), n == T ? L.splice(t--, 1) : k = Math.min(n, k)
                        }
                    }, M = 0;
                while (T < m) {
                    k == T && O();
                    var _ = Math.min(m, k);
                    for (;;) {
                        if (N) {
                            var D = T + N.length,
                                P = S;
                            for (var H = 0; H < L.length; ++H) {
                                var B = L[H];
                                P = (P ? P + " " : "") + B.marker.style, B.marker.endStyle && B.to === Math.min(D, _) && (P += " " + B.marker.endStyle), B.marker.startStyle && B.from === T && (P += " " + B.marker.startStyle)
                            }
                            a(o, D > _ ? N.slice(0, _ - T) : N, P);
                            if (D >= _) {
                                N = N.slice(_ - T), T = _;
                                break
                            }
                            T = D
                        }
                        N = c[y++], S = g(c[y++])
                    }
                }
            }
            return o
        },
        cleanUp: function () {
            this.parent = null, H(this)
        }
    }, I.prototype = {
        chunkSize: function () {
            return this.lines.length
        },
        remove: function (e, t, n) {
            for (var r = e, i = e + t; r < i; ++r) {
                var s = this.lines[r];
                this.height -= s.height, s.cleanUp();
                if (s.handlers) for (var o = 0; o < s.handlers.length; ++o) n.push(s.handlers[o])
            }
            this.lines.splice(e, t)
        },
        collapse: function (e) {
            e.splice.apply(e, [e.length, 0].concat(this.lines))
        },
        insertHeight: function (e, t, n) {
            this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
            for (var r = 0, i = t.length; r < i; ++r) t[r].parent = this
        },
        iterN: function (e, t, n) {
            for (var r = e + t; e < r; ++e) if (n(this.lines[e])) return !0
        }
    }, q.prototype = {
        chunkSize: function () {
            return this.size
        },
        remove: function (e, t, n) {
            this.size -= t;
            for (var r = 0; r < this.children.length; ++r) {
                var i = this.children[r],
                    s = i.chunkSize();
                if (e < s) {
                    var o = Math.min(t, s - e),
                        u = i.height;
                    i.remove(e, o, n), this.height -= u - i.height, s == o && (this.children.splice(r--, 1), i.parent = null);
                    if ((t -= o) == 0) break;
                    e = 0
                } else e -= s
            }
            if (this.size - t < 25) {
                var a = [];
                this.collapse(a), this.children = [new I(a)], this.children[0].parent = this
            }
        },
        collapse: function (e) {
            for (var t = 0, n = this.children.length; t < n; ++t) this.children[t].collapse(e)
        },
        insert: function (e, t) {
            var n = 0;
            for (var r = 0, i = t.length; r < i; ++r) n += t[r].height;
            this.insertHeight(e, t, n)
        },
        insertHeight: function (e, t, n) {
            this.size += t.length, this.height += n;
            for (var r = 0, i = this.children.length; r < i; ++r) {
                var s = this.children[r],
                    o = s.chunkSize();
                if (e <= o) {
                    s.insertHeight(e, t, n);
                    if (s.lines && s.lines.length > 50) {
                        while (s.lines.length > 50) {
                            var u = s.lines.splice(s.lines.length - 25, 25),
                                a = new I(u);
                            s.height -= a.height, this.children.splice(r + 1, 0, a), a.parent = this
                        }
                        this.maybeSpill()
                    }
                    break
                }
                e -= o
            }
        },
        maybeSpill: function () {
            if (this.children.length <= 10) return;
            var e = this;
            do {
                var t = e.children.splice(e.children.length - 5, 5),
                    n = new q(t);
                if (!e.parent) {
                    var r = new q(e.children);
                    r.parent = e, e.children = [r, n], e = r
                } else {
                    e.size -= n.size, e.height -= n.height;
                    var i = Et(e.parent.children, e);
                    e.parent.children.splice(i + 1, 0, n)
                }
                n.parent = e.parent
            } while (e.children.length > 10);
            e.parent.maybeSpill()
        },
        iter: function (e, t, n) {
            this.iterN(e, t - e, n)
        },
        iterN: function (e, t, n) {
            for (var r = 0, i = this.children.length; r < i; ++r) {
                var s = this.children[r],
                    o = s.chunkSize();
                if (e < o) {
                    var u = Math.min(t, o - e);
                    if (s.iterN(e, u, n)) return !0;
                    if ((t -= u) == 0) break;
                    e = 0
                } else e -= o
            }
        }
    }, X.prototype = {
        addChange: function (e, t, n) {
            this.undone.length = 0;
            var r = +(new Date),
                i = ct(this.done),
                s = i && ct(i),
                o = r - this.time;
            if (this.compound && i && !this.closed) i.push({
                start: e,
                added: t,
                old: n
            });
            else if (o > 400 || !s || this.closed || s.start > e + n.length || s.start + s.added < e) this.done.push([{
                start: e,
                added: t,
                old: n
            }]), this.closed = !1;
            else {
                var u = Math.max(0, s.start - e),
                    a = Math.max(0, e + n.length - (s.start + s.added));
                for (var f = u; f > 0; --f) s.old.unshift(n[f - 1]);
                for (var f = a; f > 0; --f) s.old.push(n[n.length - f]);
                u && (s.start = e), s.added += t - (n.length - u - a)
            }
            this.time = r
        },
        startCompound: function () {
            this.compound++ || (this.closed = !0)
        },
        endCompound: function () {
            --this.compound || (this.closed = !0)
        }
    }, e.e_stop = Q, e.e_preventDefault = J, e.e_stopPropagation = K, e.connect = et, tt.prototype = {
        set: function (e, t) {
            clearTimeout(this.id), this.id = setTimeout(t, e)
        }
    };
    var nt = e.Pass = {
        toString: function () {
            return "CodeMirror.Pass"
        }
    }, rt = function () {
        if (m) return !1;
        var e = mt("div");
        return "draggable" in e || "dragDrop" in e
    }(),
        it = function () {
            var e = mt("textarea");
            return e.value = "foo\nbar", e.value.indexOf("\r") > -1 ? "\r\n" : "\n"
        }(),
        st = /^$/;
    p ? st = /$'/ : E ? st = /\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/ : b && (st = /\-[^ \-\.?]|\?[^ \-\.?\]\}:;!'\"\),\/]|[\.!\"#&%\)*+,:;=>\]|\}~][\(\{\[<]|\$'/);
    var ft = [""],
        xt = "\n\nb".split(/\n/).length != 3 ? function (e) {
            var t = 0,
                n = [],
                r = e.length;
            while (t <= r) {
                var i = e.indexOf("\n", t);
                i == -1 && (i = e.length);
                var s = e.slice(t, e.charAt(i - 1) == "\r" ? i - 1 : i),
                    o = s.indexOf("\r");
                o != -1 ? (n.push(s.slice(0, o)), t += o + 1) : (n.push(s), t = i + 1)
            }
            return n
        } : function (e) {
            return e.split(/\r\n?|\n/)
        };
    e.splitLines = xt;
    var Tt = window.getSelection ? function (e) {
            try {
                return e.selectionStart != e.selectionEnd
            } catch (t) {
                return !1
            }
        } : function (e) {
            try {
                var t = e.ownerDocument.selection.createRange()
            } catch (n) {}
            return !t || t.parentElement() != e ? !1 : t.compareEndPoints("StartToEnd", t) != 0
        };
    e.defineMode("null", function () {
        return {
            token: function (e) {
                e.skipToEnd()
            }
        }
    }), e.defineMIME("text/plain", "null");
    var Nt = {
        3: "Enter",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        109: "-",
        107: "=",
        127: "Delete",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        63276: "PageUp",
        63277: "PageDown",
        63275: "End",
        63273: "Home",
        63234: "Left",
        63232: "Up",
        63235: "Right",
        63233: "Down",
        63302: "Insert",
        63272: "Delete"
    };
    return e.keyNames = Nt,
    function () {
        for (var e = 0; e < 10; e++) Nt[e + 48] = String(e);
        for (var e = 65; e <= 90; e++) Nt[e] = String.fromCharCode(e);
        for (var e = 1; e <= 12; e++) Nt[e + 111] = Nt[e + 63235] = "F" + e
    }(), e.version = "2.34 +", e
}(), CodeMirror.defineMode("javascript", function (e, t) {
    function o(e, t, n) {
        return t.tokenize = n, n(e, t)
    }
    function u(e, t) {
        var n = !1,
            r;
        while ((r = e.next()) != null) {
            if (r == t && !n) return !1;
            n = !n && r == "\\"
        }
        return n
    }
    function l(e, t, n) {
        return a = e, f = n, t
    }
    function c(e, t) {
        var n = e.next();
        if (n == '"' || n == "'") return o(e, t, h(n));
        if (/[\[\]{}\(\),;\:\.]/.test(n)) return l(n);
        if (n == "0" && e.eat(/x/i)) return e.eatWhile(/[\da-f]/i), l("number", "number");
        if (/\d/.test(n) || n == "-" && e.eat(/\d/)) return e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), l("number", "number");
        if (n == "/") return e.eat("*") ? o(e, t, p) : e.eat("/") ? (e.skipToEnd(), l("comment", "comment")) : t.reAllowed ? (u(e, "/"), e.eatWhile(/[gimy]/), l("regexp", "string-2")) : (e.eatWhile(s), l("operator", null, e.current()));
        if (n == "#") return e.skipToEnd(), l("error", "error");
        if (s.test(n)) return e.eatWhile(s), l("operator", null, e.current());
        e.eatWhile(/[\w\$_]/);
        var r = e.current(),
            a = i.propertyIsEnumerable(r) && i[r];
        return a && t.kwAllowed ? l(a.type, a.style, r) : l("variable", "variable", r)
    }
    function h(e) {
        return function (t, n) {
            return u(t, e) || (n.tokenize = c), l("string", "string")
        }
    }
    function p(e, t) {
        var n = !1,
            r;
        while (r = e.next()) {
            if (r == "/" && n) {
                t.tokenize = c;
                break
            }
            n = r == "*"
        }
        return l("comment", "comment")
    }
    function v(e, t, n, r, i, s) {
        this.indented = e, this.column = t, this.type = n, this.prev = i, this.info = s, r != null && (this.align = r)
    }
    function m(e, t) {
        for (var n = e.localVars; n; n = n.next) if (n.name == t) return !0
    }
    function g(e, t, n, i, s) {
        var o = e.cc;
        y.state = e, y.stream = s, y.marked = null, y.cc = o, e.lexical.hasOwnProperty("align") || (e.lexical.align = !0);
        for (;;) {
            var u = o.length ? o.pop() : r ? A : L;
            if (u(n, i)) {
                while (o.length && o[o.length - 1].lex) o.pop()();
                return y.marked ? y.marked : n == "variable" && m(e, i) ? "variable-2" : t
            }
        }
    }
    function b() {
        for (var e = arguments.length - 1; e >= 0; e--) y.cc.push(arguments[e])
    }
    function w() {
        return b.apply(null, arguments), !0
    }
    function E(e) {
        var t = y.state;
        if (t.context) {
            y.marked = "def";
            for (var n = t.localVars; n; n = n.next) if (n.name == e) return;
            t.localVars = {
                name: e,
                next: t.localVars
            }
        }
    }
    function x() {
        y.state.context = {
            prev: y.state.context,
            vars: y.state.localVars
        }, y.state.localVars = S
    }
    function T() {
        y.state.localVars = y.state.context.vars, y.state.context = y.state.context.prev
    }
    function N(e, t) {
        var n = function () {
            var n = y.state;
            n.lexical = new v(n.indented, y.stream.column(), e, null, n.lexical, t)
        };
        return n.lex = !0, n
    }
    function C() {
        var e = y.state;
        e.lexical.prev && (e.lexical.type == ")" && (e.indented = e.lexical.indented), e.lexical = e.lexical.prev)
    }
    function k(e) {
        return function (n) {
            return n == e ? w() : e == ";" ? b() : w(arguments.callee)
        }
    }
    function L(e) {
        return e == "var" ? w(N("vardef"), j, k(";"), C) : e == "keyword a" ? w(N("form"), A, L, C) : e == "keyword b" ? w(N("form"), L, C) : e == "{" ? w(N("}"), B, C) : e == ";" ? w() : e == "function" ? w(z) : e == "for" ? w(N("form"), k("("), N(")"), I, k(")"), C, L, C) : e == "variable" ? w(N("stat"), _) : e == "switch" ? w(N("form"), A, N("}", "switch"), k("{"), B, C, C) : e == "case" ? w(A, k(":")) : e == "default" ? w(k(":")) : e == "catch" ? w(N("form"), x, k("("), W, k(")"), L, C, T) : b(N("stat"), A, k(";"), C)
    }
    function A(e) {
        return d.hasOwnProperty(e) ? w(M) : e == "function" ? w(z) : e == "keyword c" ? w(O) : e == "(" ? w(N(")"), O, k(")"), C, M) : e == "operator" ? w(A) : e == "[" ? w(N("]"), H(A, "]"), C, M) : e == "{" ? w(N("}"), H(P, "}"), C, M) : w()
    }
    function O(e) {
        return e.match(/[;\}\)\],]/) ? b() : b(A)
    }
    function M(e, t) {
        if (e == "operator" && /\+\+|--/.test(t)) return w(M);
        if (e == "operator" && t == "?") return w(A, k(":"), A);
        if (e == ";") return;
        if (e == "(") return w(N(")"), H(A, ")"), C, M);
        if (e == ".") return w(D, M);
        if (e == "[") return w(N("]"), A, k("]"), C, M)
    }
    function _(e) {
        return e == ":" ? w(C, L) : b(M, k(";"), C)
    }
    function D(e) {
        if (e == "variable") return y.marked = "property", w()
    }
    function P(e) {
        e == "variable" && (y.marked = "property");
        if (d.hasOwnProperty(e)) return w(k(":"), A)
    }
    function H(e, t) {
        function n(r) {
            return r == "," ? w(e, n) : r == t ? w() : w(k(t))
        }
        return function (i) {
            return i == t ? w() : b(e, n)
        }
    }
    function B(e) {
        return e == "}" ? w() : b(L, B)
    }
    function j(e, t) {
        return e == "variable" ? (E(t), w(F)) : w()
    }
    function F(e, t) {
        if (t == "=") return w(A, F);
        if (e == ",") return w(j)
    }
    function I(e) {
        return e == "var" ? w(j, k(";"), R) : e == ";" ? w(R) : e == "variable" ? w(q) : w(R)
    }
    function q(e, t) {
        return t == "in" ? w(A) : w(M, R)
    }
    function R(e, t) {
        return e == ";" ? w(U) : t == "in" ? w(A) : w(A, k(";"), U)
    }
    function U(e) {
        e != ")" && w(A)
    }
    function z(e, t) {
        if (e == "variable") return E(t), w(z);
        if (e == "(") return w(N(")"), x, H(W, ")"), C, L, T)
    }
    function W(e, t) {
        if (e == "variable") return E(t), w()
    }
    var n = e.indentUnit,
        r = t.json,
        i = function () {
            function e(e) {
                return {
                    type: e,
                    style: "keyword"
                }
            }
            var t = e("keyword a"),
                n = e("keyword b"),
                r = e("keyword c"),
                i = e("operator"),
                s = {
                    type: "atom",
                    style: "atom"
                };
            return {
                "if": t,
                "while": t,
                "with": t,
                "else": n,
                "do": n,
                "try": n,
                "finally": n,
                "return": r,
                "break": r,
                "continue": r,
                "new": r,
                "delete": r,
                "throw": r,
                "var": e("var"),
                "const": e("var"),
                let: e("var"),
                "function": e("function"),
                "catch": e("catch"),
                "for": e("for"),
                "switch": e("switch"),
                "case": e("case"),
                "default": e("default"),
                "in": i,
                "typeof": i,
                "instanceof": i,
                "true": s,
                "false": s,
                "null": s,
                "undefined": s,
                NaN: s,
                Infinity: s
            }
        }(),
        s = /[+\-*&%=<>!?|]/,
        a, f, d = {
            atom: !0,
            number: !0,
            variable: !0,
            string: !0,
            regexp: !0
        }, y = {
            state: null,
            column: null,
            marked: null,
            cc: null
        }, S = {
            name: "this",
            next: {
                name: "arguments"
            }
        };
    return C.lex = !0, {
        startState: function (e) {
            return {
                tokenize: c,
                reAllowed: !0,
                kwAllowed: !0,
                cc: [],
                lexical: new v((e || 0) - n, 0, "block", !1),
                localVars: t.localVars,
                context: t.localVars && {
                    vars: t.localVars
                },
                indented: 0
            }
        },
        token: function (e, t) {
            e.sol() && (t.lexical.hasOwnProperty("align") || (t.lexical.align = !1), t.indented = e.indentation());
            if (e.eatSpace()) return null;
            var n = t.tokenize(e, t);
            return a == "comment" ? n : (t.reAllowed = a == "operator" || a == "keyword c" || !! a.match(/^[\[{}\(,;:]$/), t.kwAllowed = a != ".", g(t, n, a, f, e))
        },
        indent: function (e, t) {
            if (e.tokenize == p) return CodeMirror.Pass;
            if (e.tokenize != c) return 0;
            var r = t && t.charAt(0),
                i = e.lexical;
            i.type == "stat" && r == "}" && (i = i.prev);
            var s = i.type,
                o = r == s;
            return s == "vardef" ? i.indented + 4 : s == "form" && r == "{" ? i.indented : s == "stat" || s == "form" ? i.indented + n : i.info == "switch" && !o ? i.indented + (/^(?:case|default)\b/.test(t) ? n : 2 * n) : i.align ? i.column + (o ? 0 : 1) : i.indented + (o ? 0 : n)
        },
        electricChars: ":{}"
    }
}), CodeMirror.defineMIME("text/javascript", "javascript"), CodeMirror.defineMIME("application/json", {
    name: "javascript",
    json: !0
}),
function () {
    CodeMirror.simpleHint = function (e, t, n) {
        function o(n) {
            function a(t) {
                e.replaceRange(t, s.from, s.to)
            }
            function m() {
                if (v) return;
                v = !0, f.parentNode.removeChild(f)
            }
            function g() {
                a(u[l.selectedIndex]), m(), setTimeout(function () {
                    e.focus()
                }, 50)
            }
            if (e.somethingSelected()) return;
            var i = e.getTokenAt(e.getCursor());
            if (!r.closeOnTokenChange || n == null || i.start == n.start && i.className == n.className) {
                var s = t(e);
                if (!s || !s.list.length) return;
                var u = s.list;
                if (r.completeSingle && u.length == 1) return a(u[0]), !0;
                var f = document.createElement("div");
                f.className = "CodeMirror-completions";
                var l = f.appendChild(document.createElement("select"));
                window.opera || (l.multiple = !0);
                for (var c = 0; c < u.length; ++c) {
                    var h = l.appendChild(document.createElement("option"));
                    h.appendChild(document.createTextNode(u[c]))
                }
                l.firstChild.selected = !0, l.size = Math.min(10, u.length);
                var p = e.cursorCoords();
                f.style.left = p.x + "px", f.style.top = p.yBot + "px", document.body.appendChild(f);
                var d = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
                d - p.x < l.clientWidth && (f.style.left = p.x - l.clientWidth + "px"), u.length <= 10 && (f.style.width = l.clientWidth - 1 + "px");
                var v = !1;
                return CodeMirror.connect(l, "blur", m), CodeMirror.connect(l, "keydown", function (t) {
                    var n = t.keyCode;
                    n == 13 ? (CodeMirror.e_stop(t), g()) : n == 27 ? (CodeMirror.e_stop(t), m(), e.focus()) : n != 38 && n != 40 && n != 33 && n != 34 && !CodeMirror.isModifierKey(t) && (m(), e.focus(), e.triggerOnKeyDown(t), (!r.closeOnBackspace || n != 8) && setTimeout(function () {
                        o(i)
                    }, 50))
                }), CodeMirror.connect(l, "dblclick", g), l.focus(), window.opera && setTimeout(function () {
                    v || l.focus()
                }, 100), !0
            }
            return
        }
        var r = {}, i = CodeMirror.simpleHint.defaults;
        for (var s in i) i.hasOwnProperty(s) && (r[s] = (n && n.hasOwnProperty(s) ? n : i)[s]);
        return o()
    }, CodeMirror.simpleHint.defaults = {
        closeOnBackspace: !0,
        closeOnTokenChange: !1,
        completeSingle: !0
    }
}(),
function () {
    function e(e) {
        var t = [/for\s*?\((.*?)\)/, /\"(.*?)(\"|$)/, /\'(.*?)(\'|$)/, /\/\*(.*?)(\*\/|$)/, /\/\/.*/],
            n = [];
        for (var r = 0; r < t.length; r++) {
            var i = 0;
            while (i < e.length) {
                var s = e.substr(i).match(t[r]);
                if (s == null) break;
                n.push({
                    start: i + s.index,
                    end: i + s.index + s[0].length
                }), i += s.index + Math.max(1, s[0].length)
            }
        }
        return n.sort(function (e, t) {
            return e.start - t.start
        }), n
    }
    function t(e, t) {
        return CodeMirror.innerMode(e.getMode(), e.getTokenAt(t).state).mode
    }
    function n(e, t, n, r) {
        var i = e.getMode(),
            s = e.getLine(t);
        r == null && (r = s.length);
        if (!i.innerMode) return [{
            from: n,
            to: r,
            mode: i
        }];
        var o = e.getTokenAt({
            line: t,
            ch: n
        }).state,
            u = CodeMirror.innerMode(i, o).mode,
            a = [],
            f = new CodeMirror.StringStream(s);
        f.pos = f.start = n;
        for (;;) {
            i.token(f, o);
            var l = CodeMirror.innerMode(i, o).mode;
            if (l != u) {
                var c = f.start;
                u.name == "xml" && s.charAt(f.pos - 1) == ">" && (c = f.pos), a.push({
                    from: n,
                    to: c,
                    mode: u
                }), n = c, u = l
            }
            if (f.pos >= r) break;
            f.start = f.pos
        }
        return n < r && a.push({
            from: n,
            to: r,
            mode: u
        }), a
    }
    CodeMirror.extendMode("css", {
        commentStart: "/*",
        commentEnd: "*/",
        wordWrapChars: [";", "\\{", "\\}"],
        autoFormatLineBreaks: function (e) {
            return e.replace(new RegExp("(;|\\{|\\})([^\r\n])", "g"), "$1\n$2")
        }
    }), CodeMirror.extendMode("javascript", {
        commentStart: "/*",
        commentEnd: "*/",
        wordWrapChars: [";", "\\{", "\\}"],
        autoFormatLineBreaks: function (t) {
            var n = 0,
                r = /(;|\{|\})([^\r\n;])/g,
                i = e(t);
            if (i != null) {
                var s = "";
                for (var o = 0; o < i.length; o++) i[o].start > n && (s += t.substring(n, i[o].start).replace(r, "$1\n$2"), n = i[o].start), i[o].start <= n && i[o].end >= n && (s += t.substring(n, i[o].end), n = i[o].end);
                return n < t.length && (s += t.substr(n).replace(r, "$1\n$2")), s
            }
            return t.replace(r, "$1\n$2")
        }
    }), CodeMirror.extendMode("xml", {
        commentStart: "<!--",
        commentEnd: "-->",
        wordWrapChars: [">"],
        autoFormatLineBreaks: function (e) {
            var t = e.split("\n"),
                n = new RegExp("(^\\s*?<|^[^<]*?)(.+)(>\\s*?$|[^>]*?$)"),
                r = new RegExp("<", "g"),
                i = new RegExp("(>)([^\r\n])", "g");
            for (var s = 0; s < t.length; s++) {
                var o = t[s].match(n);
                if (o != null && o.length > 3) {
                    t[s] = o[1] + o[2].replace(r, "\n$&").replace(i, "$1\n$2") + o[3];
                    continue
                }
            }
            return t.join("\n")
        }
    }), CodeMirror.defineExtension("commentRange", function (e, n, r) {
        var i = t(this, n),
            s = this;
        this.operation(function () {
            if (e) s.replaceRange(i.commentEnd, r), s.replaceRange(i.commentStart, n), n.line == r.line && n.ch == r.ch && s.setCursor(n.line, n.ch + i.commentStart.length);
            else {
                var t = s.getRange(n, r),
                    o = t.indexOf(i.commentStart),
                    u = t.lastIndexOf(i.commentEnd);
                o > -1 && u > -1 && u > o && (t = t.substr(0, o) + t.substring(o + i.commentStart.length, u) + t.substr(u + i.commentEnd.length)), s.replaceRange(t, n, r)
            }
        })
    }), CodeMirror.defineExtension("autoIndentRange", function (e, t) {
        var n = this;
        this.operation(function () {
            for (var r = e.line; r <= t.line; r++) n.indentLine(r, "smart")
        })
    }), CodeMirror.defineExtension("autoFormatRange", function (e, t) {
        var r = this;
        r.operation(function () {
            for (var i = e.line, s = t.line; i <= s; ++i) {
                var o = {
                    line: i,
                    ch: i == e.line ? e.ch : 0
                }, u = {
                    line: i,
                    ch: i == s ? t.ch : null
                }, a = n(r, i, o.ch, u.ch),
                    f = "",
                    l = r.getRange(o, u);
                for (var c = 0; c < a.length; ++c) {
                    var h = a.length > 1 ? l.slice(a[c].from, a[c].to) : l;
                    f && (f += "\n"), a[c].mode.autoFormatLineBreaks ? f += a[c].mode.autoFormatLineBreaks(h) : f += l
                }
                if (f != l) {
                    for (var p = 0, d = f.indexOf("\n"); d != -1; d = f.indexOf("\n", d + 1), ++p);
                    r.replaceRange(f, o, u), i += p, s += p
                }
            }
            for (var i = e.line + 1; i <= s; ++i) r.indentLine(i, "smart");
            r.setSelection(e, r.getCursor(!1))
        })
    })
}()