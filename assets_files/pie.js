(function () {
    var l = window.AmCharts;
    l.AmPieChart = l.Class({
        inherits: l.AmSlicedChart,
        construct: function (d) {
            this.type = "pie";
            l.AmPieChart.base.construct.call(this, d);
            this.cname = "AmPieChart";
            this.pieBrightnessStep = 30;
            this.minRadius = 10;
            this.depth3D = 0;
            this.startAngle = 90;
            this.angle = this.innerRadius = 0;
            this.startRadius = "500%";
            this.pullOutRadius = "20%";
            this.labelRadius = 20;
            this.labelText = "[[title]]: [[percents]]%";
            this.balloonText = "[[title]]: [[percents]]% ([[value]])\n[[description]]";
            this.previousScale = 1;
            this.adjustPrecision = !1;
            l.applyTheme(this, d, this.cname)
        },
        drawChart: function () {
            l.AmPieChart.base.drawChart.call(this);
            var d = this.chartData;
            if (l.ifArray(d)) {
                if (0 < this.realWidth && 0 < this.realHeight) {
                    l.VML && (this.startAlpha = 1);
                    var g = this.startDuration,
                        c = this.container,
                        b = this.updateWidth();
                    this.realWidth = b;
                    var n = this.updateHeight();
                    this.realHeight = n;
                    var e = l.toCoordinate,
                        f = e(this.marginLeft, b),
                        a = e(this.marginRight, b),
                        v = e(this.marginTop, n) + this.getTitleHeight(),
                        m = e(this.marginBottom, n),
                        A, B, k, y = l.toNumber(this.labelRadius),
                        p =
                        this.measureMaxLabel();
                    p > this.maxLabelWidth && (p = this.maxLabelWidth);
                    this.labelText && this.labelsEnabled || (y = p = 0);
                    A = void 0 === this.pieX ? (b - f - a) / 2 + f : e(this.pieX, this.realWidth);
                    B = void 0 === this.pieY ? (n - v - m) / 2 + v : e(this.pieY, n);
                    k = e(this.radius, b, n);
                    k || (b = 0 <= y ? b - f - a - 2 * p : b - f - a, n = n - v - m, k = Math.min(b, n), n < b && (k /= 1 - this.angle / 90, k > b && (k = b)), n = l.toCoordinate(this.pullOutRadius, k), k = (0 <= y ? k - 1.8 * (y + n) : k - 1.8 * n) / 2);
                    k < this.minRadius && (k = this.minRadius);
                    n = e(this.pullOutRadius, k);
                    v = l.toCoordinate(this.startRadius, k);
                    e = e(this.innerRadius, k);
                    e >= k && (e = k - 1);
                    m = l.fitToBounds(this.startAngle, 0, 360);
                    0 < this.depth3D && (m = 270 <= m ? 270 : 90);
                    m -= 90;
                    360 < m && (m -= 360);
                    b = k - k * this.angle / 90;
                    for (f = p = 0; f < d.length; f++) a = d[f], !0 !== a.hidden && (p += l.roundTo(a.percents, this.pf.precision));
                    p = l.roundTo(p, this.pf.precision);
                    this.tempPrec = NaN;
                    this.adjustPrecision && 100 != p && (this.tempPrec = this.pf.precision + 1);
                    for (var D, f = 0; f < d.length; f++)
                        if (a = d[f], !0 !== a.hidden && (this.showZeroSlices || 0 !== a.percents)) {
                            var t = 360 * a.percents / 100,
                                p = Math.sin((m + t / 2) / 180 *
                                    Math.PI),
                                C = -Math.cos((m + t / 2) / 180 * Math.PI) * (b / k),
                                q = this.outlineColor;
                            q || (q = a.color);
                            var w = this.alpha;
                            isNaN(a.alpha) || (w = a.alpha);
                            q = {
                                fill: a.color,
                                stroke: q,
                                "stroke-width": this.outlineThickness,
                                "stroke-opacity": this.outlineAlpha,
                                "fill-opacity": w
                            };
                            a.url && (q.cursor = "pointer");
                            q = l.wedge(c, A, B, m, t, k, b, e, this.depth3D, q, this.gradientRatio, a.pattern, this.path);
                            l.setCN(this, q, "pie-item");
                            l.setCN(this, q.wedge, "pie-slice");
                            l.setCN(this, q, a.className, !0);
                            this.addEventListeners(q, a);
                            a.startAngle = m;
                            d[f].wedge = q;
                            0 <
                                g && (this.chartCreated || q.setAttr("opacity", this.startAlpha));
                            a.ix = p;
                            a.iy = C;
                            a.wedge = q;
                            a.index = f;
                            a.label = null;
                            w = c.set();
                            if (this.labelsEnabled && this.labelText && a.percents >= this.hideLabelsPercent) {
                                var h = m + t / 2;
                                0 > h && (h += 360);
                                360 < h && (h -= 360);
                                var r = y;
                                isNaN(a.labelRadius) || (r = a.labelRadius, 0 > r && (a.skipTick = !0));
                                var t = A + p * (k + r),
                                    E = B + C * (k + r),
                                    x, u = 0;
                                isNaN(D) && 350 < h && 1 < d.length - f && (D = f - 1 + Math.floor((d.length - f) / 2));
                                if (0 <= r) {
                                    var z;
                                    90 >= h && 0 <= h ? (z = 0, x = "start", u = 8) : 90 <= h && 180 > h ? (z = 1, x = "start", u = 8) : 180 <= h && 270 > h ? (z =
                                        2, x = "end", u = -8) : 270 <= h && 357 >= h ? (z = 3, x = "end", u = -8) : 357 <= h && (f > D ? (z = 0, x = "start", u = 8) : (z = 3, x = "end", u = -8));
                                    a.labelQuarter = z
                                } else x = "middle";
                                h = this.formatString(this.labelText, a);
                                (r = this.labelFunction) && (h = r(a, h));
                                r = a.labelColor;
                                r || (r = this.color);
                                if ("" !== h) {
                                    h = l.wrappedText(c, h, r, this.fontFamily, this.fontSize, x, !1, this.maxLabelWidth);
                                    l.setCN(this, h, "pie-label");
                                    l.setCN(this, h, a.className, !0);
                                    h.translate(t + 1.5 * u, E);
                                    h.node.style.pointerEvents = "none";
                                    a.ty = E;
                                    a.textX = t + 1.5 * u;
                                    var r = h.getBBox(),
                                        F = l.rect(c, r.width +
                                            5, r.height + 5, "#FFFFFF", .005);
                                    F.translate(t + 1.5 * u + r.x, E + r.y);
                                    a.hitRect = F;
                                    w.push(h);
                                    w.push(F);
                                    this.axesSet.push(w);
                                    a.labelSet = w;
                                    a.label = h
                                }
                                a.tx = t;
                                a.tx2 = t + u;
                                a.tx0 = A + p * k;
                                a.ty0 = B + C * k
                            }
                            t = e + (k - e) / 2;
                            a.pulled && (t += this.pullOutRadiusReal);
                            a.balloonX = p * t + A;
                            a.balloonY = C * t + B;
                            a.startX = Math.round(p * v);
                            a.startY = Math.round(C * v);
                            a.pullX = Math.round(p * n);
                            a.pullY = Math.round(C * n);
                            this.graphsSet.push(q);
                            if (0 === a.alpha || 0 < g && !this.chartCreated) q.hide(), w && w.hide();
                            m += 360 * a.percents / 100;
                            360 < m && (m -= 360)
                        }
                    0 < y && this.arrangeLabels();
                    this.pieXReal = A;
                    this.pieYReal = B;
                    this.radiusReal = k;
                    this.innerRadiusReal = e;
                    0 < y && this.drawTicks();
                    this.initialStart();
                    this.setDepths()
                } (d = this.legend) && d.invalidateSize()
            } else this.cleanChart();
            this.dispDUpd()
        },
        setDepths: function () {
            var d = this.chartData,
                g;
            for (g = 0; g < d.length; g++) {
                var c = d[g],
                    b = c.wedge,
                    c = c.startAngle;
                0 <= c && 180 > c ? b.toFront() : 180 <= c && b.toBack()
            }
        },
        arrangeLabels: function () {
            var d = this.chartData,
                g = d.length,
                c, b;
            for (b = g - 1; 0 <= b; b--) c = d[b], 0 !== c.labelQuarter || c.hidden || this.checkOverlapping(b, c, 0, !0, 0);
            for (b = 0; b < g; b++) c = d[b], 1 != c.labelQuarter || c.hidden || this.checkOverlapping(b, c, 1, !1, 0);
            for (b = g - 1; 0 <= b; b--) c = d[b], 2 != c.labelQuarter || c.hidden || this.checkOverlapping(b, c, 2, !0, 0);
            for (b = 0; b < g; b++) c = d[b], 3 != c.labelQuarter || c.hidden || this.checkOverlapping(b, c, 3, !1, 0)
        },
        checkOverlapping: function (d, g, c, b, l) {
            var e, f, a = this.chartData,
                v = a.length,
                m = g.label;
            if (m) {
                if (!0 === b)
                    for (f = d + 1; f < v; f++) a[f].labelQuarter == c && (e = this.checkOverlappingReal(g, a[f], c)) && (f = v);
                else
                    for (f = d - 1; 0 <= f; f--) a[f].labelQuarter == c && (e =
                        this.checkOverlappingReal(g, a[f], c)) && (f = 0);
                !0 === e && 100 > l && isNaN(g.labelRadius) && (e = g.ty + 3 * g.iy, g.ty = e, m.translate(g.textX, e), g.hitRect && (m = m.getBBox(), g.hitRect.translate(g.tx2, e + m.y)), this.checkOverlapping(d, g, c, b, l + 1))
            }
        },
        checkOverlappingReal: function (d, g, c) {
            var b = !1,
                n = d.label,
                e = g.label;
            d.labelQuarter != c || d.hidden || g.hidden || !e || (n = n.getBBox(), c = {}, c.width = n.width, c.height = n.height, c.y = d.ty, c.x = d.tx, d = e.getBBox(), e = {}, e.width = d.width, e.height = d.height, e.y = g.ty, e.x = g.tx, l.hitTest(c, e) && (b = !0));
            return b
        }
    })
})();