/****************************************************************************
*          PredictLib: A satellite tracking/orbital prediction library      *
*                      Copyright Andrew T. West, 2008                       *
*        Based on PREDICT, Copyright John A. Magliacane, KD2BD 1991-2002    *
*                         Last update: 07-Jun-2008                          *
*****************************************************************************
*                                                                           *
* This program is free software; you can redistribute it and/or modify it   *
* under the terms of the GNU General Public License as published by the     *
* Free Software Foundation; either version 2 of the License or any later    *
* version.                                                                  *
*                                                                           *
* This program is distributed in the hope that it will be useful,           *
* but WITHOUT ANY WARRANTY; without even the implied warranty of            *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU         *
* General Public License for more details.                                  *
*                                                                           *
*****************************************************************************/


    
var PLib = 
    {
        deg2rad: 1.745329251994330E-2,
        pi: 3.14159265358979323846, pio2: 1.57079632679489656, twopi: 6.28318530717958623,
        e6a: 1.0E-6,
        tothrd: 6.6666666666666666E-1,
        xj3: -2.53881E-6, xke: 7.43669161E-2, xkmper: 6.378137E3, xmnpda: 1.44E3,
        ae: 1.0,
        ck2: 5.413079E-4, ck4: 6.209887E-7,
        f: 3.35281066474748E-3, s: 1.012229,
        qoms2t: 1.880279E-09,
        secday: 8.6400E4,
        omega_E: 1.00273790934,
        zns: 1.19459E-5, c1ss: 2.9864797E-6, zes: 1.675E-2, znl: 1.5835218E-4, c1l: 4.7968065E-7, zel: 5.490E-2,
        zcosis: 9.1744867E-1, zsinis: 3.9785416E-1, zsings: -9.8088458E-1, zcosgs: 1.945905E-1,
        q22: 1.7891679E-6, q31: 2.1460748E-6, q33: 2.2123015E-7,
        g22: 5.7686396, g32: 9.5240898E-1, g44: 1.8014998, g52: 1.0508330, g54: 4.4108898,
        root22: 1.7891679E-6, root32: 3.7393792E-7, root44: 7.3636953E-9, root52: 1.1428639E-7, root54: 2.1765803E-9,
        thdt: 4.3752691E-3,
        mfactor: 7.292115E-5,
        sr: 6.96000E5,
        AU: 1.49597870691E8,

        dpinit: 1, dpsec: 2, dpper: 3,

        ALL_FLAGS: -1,
        SGP4_INITIALIZED_FLAG: 0x000002,
        SDP4_INITIALIZED_FLAG: 0x000004,
        SIMPLE_FLAG: 0x000020,
        DEEP_SPACE_EPHEM_FLAG: 0x000040,
        LUNAR_TERMS_DONE_FLAG: 0x000080,
        DO_LOOP_FLAG: 0x000200,
        RESONANCE_FLAG: 0x000400,
        SYNCHRONOUS_FLAG: 0x000800,
        EPOCH_RESTART_FLAG: 0x001000,
        VISIBLE_FLAG: 0x002000,
        SAT_ECLIPSED_FLAG: 0x004000,

        sat_t: function()
            {
                this.line1 = "";
                this.line2 = "";
                this.name = "";
                this.catnum = 0;
                this.setnum = 0;
                this.designator = "";
                this.year = 0;
                this.refepoch = 0.0;
                this.incl = 0.0;
                this.raan = 0.0;
                this.eccn = 0.0;
                this.argper = 0.0;
                this.meanan = 0.0;
                this.meanmo = 0.0;
                this.drag = 0.0;
                this.nddot6 = 0.0;
                this.bstar = 0.0;
                this.orbitnum = 0.0;
                this.refepoch = 0;
            },

        sat: new Array(),

        qth:
            {
                callsign: "HOME",
                stnlat: 0.0,
                stnlong: 0.0,
                stnalt: 1000,
                utc_offset: new Date().getTimezoneOffset() / 60
            },

        tempstr: "", output: "",

        tsince: 0.0, jul_epoch: 0.0, jul_utc: 0.0, eclipse_depth: 0.0,
            sat_azi: 0.0, sat_ele: 0.0, sat_range: 0.0, sat_range_rate: 0.0,
            sat_lat: 0.0, sat_lon: 0.0, sat_alt: 0.0, sat_vel: 0.0, phase: 0.0,
            sun_azi: 0.0, sun_ele: 0.0, daynum: 0.0, fm: 0.0, fk: 0.0, age: 0.0, aostime: 0.0,
            lostime: 0.0, ax: 0.0, ay: 0.0, az: 0.0, rx: 0.0, ry: 0.0, rz: 0.0, squint: 0.0, alat: 0.0, alon: 0.0,

        ephem: "", sat_sun_status: "", findsun: "",

        indx: 0, iaz: 0, iel: 0, ma256: 0, isplat: 0, isplong: 0, Flags: 0,

        rv: 0, irk: 0,

        tle_t: function()
        {
            this.epoch = 0.0;
            this.xndt2o = 0.0;
            this.xndd6o = 0.0;
            this.bstar = 0.0;
            this.xincl = 0.0;
            this.xnodeo = 0.0;
            this.eo = 0.0;
            this.omegao = 0.0;
            this.xmo = 0.0;
            this.xno = 0.0;
            this.catnr = 0;
            this.elset = 0;
            this.revnum = 0;
            this.sat_name = "";
            this.idesg = "";
        },

        geodetic_t: function()
        {
            this.lat = 0.0;
            this.lon = 0.0;
            this.alt = 0.0;
            this.theta = 0.0;
        },

        vector_t: function()
        {
            this.x = 0.0;
            this.y = 0.0;
            this.z = 0.0;
            this.w = 0.0;
        },

        deep_arg_t: function()
        {
            this.eosq = 0.0;
            this.sinio = 0.0;
            this.cosio = 0.0;
            this.betao = 0.0;
            this.aodp = 0.0;
            this.theta2 = 0.0;
            this.sing = 0.0;
            this.cosg = 0.0;
            this.betao2 = 0.0;
            this.xmdot = 0.0;
            this.omgdot = 0.0;
            this.xnodot = 0.0;
            this.xnodp = 0.0;
            this.xll = 0.0;
            this.omgadf = 0.0;
            this.xnode = 0.0;
            this.em = 0.0;
            this.xinc = 0.0;
            this.xn = 0.0;
            this.t = 0.0;
            this.ds50 = 0.0;
        },

        obs_geodetic: new Object(),
        tle: new Object(),
        tleData: new Array(),

        isFlagSet: function(flag)
        {
            return (PLib.Flags & flag);
        },

        isFlagClear: function(flag)
        {
            return (~PLib.Flags & flag);
        },

        SetFlag: function(flag)
        {
            PLib.Flags |= flag;
        },

        ClearFlag: function (flag)
        {
            PLib.Flags &= ~flag;
        },

        Sqr: function(arg)
        {
            return (arg * arg);
        },

        Radians: function(arg)
        {
            return (arg * PLib.deg2rad);
        },

        Degrees: function(arg)
        {
            return (arg / PLib.deg2rad);
        },

        Magnitude: function(v)
        {
            v.w = Math.sqrt(PLib.Sqr(v.x) + PLib.Sqr(v.y) + PLib.Sqr(v.z));
        },

        Vec_Sub: function(v1, v2, v3)
        {
            v3.x = v1.x - v2.x;
            v3.y = v1.y - v2.y;
            v3.z = v1.z - v2.z;
            PLib.Magnitude(v3);
        },

        Scalar_Multiply: function(k, v1, v2)
        {
            v2.x = k * v1.x;
            v2.y = k * v1.y;
            v2.z = k * v1.z;
            v2.w = Math.abs(k) * v1.w;
        },

        Scale_Vector: function(k, v)
        { 
            v.x *= k;
            v.y *= k;
            v.z *= k;
            PLib.Magnitude(v);
        },

        Dot: function(v1, v2)
        {
            return (v1.x * v2.x + v1.y * v2.y + v1.z * v2.z);
        },

        Angle: function(v1, v2)
        {
            PLib.Magnitude(v1);
            PLib.Magnitude(v2);
            return (Math.acos(PLib.Dot(v1, v2) / (v1.w * v2.w)));
        },

        FMod2p: function(x)
        {
            var i = 0;
            var ret_val = 0.0;

            ret_val = x;
            i = parseInt(ret_val / PLib.twopi);
            ret_val -= i * PLib.twopi;

            if (ret_val < 0.0)
                ret_val += PLib.twopi;

            return ret_val;
        },

        Modulus: function(arg1, arg2)
        {
            return arg1 - (parseInt(arg1 / arg2)) * arg2;
        },

        Frac: function(arg)
        {
            return(arg - Math.floor(arg));
        },

        Convert_Sat_State: function(pos, vel)
        {
            PLib.Scale_Vector(PLib.xkmper, pos);
            PLib.Scale_Vector(PLib.xkmper * PLib.xmnpda / PLib.secday, vel);
        },

        Julian_Date_of_Year: function(year)
        {
            var A = 0, B = 0, i = 0;
            var jdoy = 0.0;

            year = year - 1;
            i = parseInt(year / 100);
            A = i;
            i = parseInt(A / 4);
            B = 2 - A + i;
            i = parseInt(365.25 * year);
            i += parseInt(30.6001 * 14);
            jdoy = i + 1720994.5 + B;

            return jdoy;
        },

        Julian_Date_of_Epoch: function(epoch)
        { 
            var year = 0.0, day = 0.0;
        
            year = parseInt(epoch * 1E-3);
            day = ((epoch * 1E-3) - year) * 1E3;
        
            if (year < 57)
                year = year + 2000;
            else
                year = year + 1900;
        
            return (PLib.Julian_Date_of_Year(year) + day);
        },

        Delta_ET: function(year)
        {
            var delta_et = 0.0;
        
            delta_et = 26.465 + 0.747622 * (year - 1950) + 1.886913 * Math.sin(PLib.twopi * (year - 1975) / 33);
        
            return delta_et;
        },

        ThetaG: function(epoch, deep_arg)
        {
            var year = 0.0, day = 0.0, UT = 0.0, jd = 0.0, TU = 0.0, GMST = 0.0, ThetaG = 0.0;
        
            year = parseInt(epoch * 1E-3);
            day = ((epoch * 1E-3) - year) * 1E3;
        
            if (year < 57)
                year += 2000;
            else
                year += 1900;
        
            UT = (day - parseInt(day));
            day = parseInt(day);
            jd = PLib.Julian_Date_of_Year(year) + day;
            TU = (jd - 2451545.0) / 36525;
            GMST = 24110.54841 + TU * (8640184.812866 + TU * (0.093104 - TU * 6.2E-6));
            GMST = PLib.Modulus(GMST + PLib.secday * PLib.omega_E * UT, PLib.secday);
            ThetaG = twopi * GMST / PLib.secday;
            deep_arg.ds50 = jd - 2433281.5 + UT;
            ThetaG = PLib.FMod2p(6.3003880987 * deep_arg.ds50 + 1.72944494);
        
            return ThetaG;
        },

        ThetaG_JD: function(jd)
        {
            var UT = 0.0, TU = 0.0, GMST = 0.0;

            UT = PLib.Frac(jd + 0.5);
            jd = jd - UT;
            TU = (jd - 2451545.0) / 36525;
            GMST = 24110.54841 + TU * (8640184.812866 + TU * (0.093104 - TU * 6.2E-6));
            GMST = PLib.Modulus(GMST + PLib.secday * PLib.omega_E * UT, PLib.secday);

            return (PLib.twopi * GMST / PLib.secday);
        },

        Calculate_Solar_Position: function(time, solar_vector)
        {
            var mjd = 0.0, year = 0.0, T = 0.0, M = 0.0, L = 0.0, e = 0.0, C = 0.0, O = 0.0, Lsa = 0.0, nu = 0.0, R = 0.0, eps = 0.0;

            mjd  =  time - 2415020.0;
            year  =  1900  +  mjd / 365.25;
            T = (mjd + PLib.Delta_ET(year) / PLib.secday) / 36525.0;
            M = PLib.Radians(PLib.Modulus(358.47583 + PLib.Modulus(35999.04975 * T, 360.0) - (0.000150 + 0.0000033 * T) * PLib.Sqr(T), 360.0));
            L = PLib.Radians(PLib.Modulus(279.69668 + PLib.Modulus(36000.76892 * T, 360.0) + 0.0003025 * PLib.Sqr(T),360.0));
            e = 0.01675104 - (0.0000418 + 0.000000126 * T) * T;
            C = PLib.Radians((1.919460 - (0.004789 + 0.000014 * T) * T) * Math.sin(M) + (0.020094 - 0.000100 * T) * Math.sin(2 * M) + 0.000293 * Math.sin(3 * M));
            O = PLib.Radians(PLib.Modulus(259.18-1934.142 * T, 360.0));
            Lsa = PLib.Modulus(L + C - PLib.Radians(0.00569-0.00479 * Math.sin(O)), PLib.twopi);
            nu = PLib.Modulus(M + C, PLib.twopi);
            R = 1.0000002 * (1.0 - PLib.Sqr(e)) / (1.0 + e * Math.cos(nu));
            eps = PLib.Radians(23.452294 - (0.0130125 + (0.00000164 - 0.000000503 * T) * T) * T + 0.00256 * Math.cos(O));
            R = PLib.AU * R;
            solar_vector.x = R * Math.cos(Lsa);
            solar_vector.y = R * Math.sin(Lsa) * Math.cos(eps);
            solar_vector.z = R * Math.sin(Lsa) * Math.sin(eps);
            solar_vector.w = R;
        },

        Sat_Eclipsed: function(pos, sol)
        {
            var sd_sun = 0.0, sd_earth = 0.0, delta = 0.0;
            var Rho = new PLib.vector_t();
            var earth = new PLib.vector_t();;

            sd_earth = Math.asin(PLib.xkmper / pos.w);
            PLib.Vec_Sub(sol, pos, Rho);
            sd_sun = Math.asin(PLib.sr / Rho.w);
            PLib.Scalar_Multiply(-1, pos, earth);
            delta = PLib.Angle(sol, earth);
            PLib.eclipse_depth = sd_earth - sd_sun - delta;

            if (sd_earth < sd_sun)
                return 0;
            else
                if (PLib.eclipse_depth >= 0)
                    return 1;
            else
                return 0;
        },

        select_ephemeris: function(tle)
        {
            var ao = 0.0, xnodp = 0.0, dd1 = 0.0, dd2 = 0.0, delo = 0.0, temp = 0.0, a1 = 0.0, del1 = 0.0, r1 = 0.0;

            tle.xnodeo *= PLib.deg2rad;
            tle.omegao *= PLib.deg2rad;
            tle.xmo *= PLib.deg2rad;
            tle.xincl *= PLib.deg2rad;
            temp = PLib.twopi / PLib.xmnpda / PLib.xmnpda;
            tle.xno = tle.xno * temp * PLib.xmnpda;
            tle.xndt2o *= temp;
            tle.xndd6o = tle.xndd6o * temp / PLib.xmnpda;
            tle.bstar /= PLib.ae;

            dd1 = (PLib.xke / tle.xno);
            dd2 = PLib.tothrd;
            a1 = Math.pow(dd1, dd2);
            r1 = Math.cos(tle.xincl);
            dd1 = (1.0 - tle.eo * tle.eo);
            temp = PLib.ck2 * 1.5 * (r1 * r1 * 3.0 - 1.0) / Math.pow(dd1, 1.5);
            del1 = temp / (a1 * a1);
            ao = a1 * (1.0 - del1 * (PLib.tothrd * 0.5 + del1 * (del1 * 1.654320987654321 + 1.0)));
            delo = temp / (ao * ao);
            xnodp = tle.xno / (delo + 1.0);

            if (PLib.twopi / PLib.xnodp / PLib.xmnpda >= 0.15625)
                PLib.SetFlag(PLib.DEEP_SPACE_EPHEM_FLAG);
            else
                PLib.ClearFlag(PLib.DEEP_SPACE_EPHEM_FLAG);
        },

        SGP4: function(tsince, tle, pos, vel)
        {
            var cosuk = 0.0, sinuk = 0.0, rfdotk = 0.0, vx = 0.0, vy = 0.0, vz = 0.0, ux = 0.0, uy = 0.0, uz = 0.0, xmy = 0.0, xmx = 0.0, cosnok = 0.0,
                sinnok = 0.0, cosik = 0.0, sinik = 0.0, rdotk = 0.0, xinck = 0.0, xnodek = 0.0, uk = 0.0, rk = 0.0, cos2u = 0.0, sin2u = 0.0,
                u = 0.0, sinu = 0.0, cosu = 0.0, betal = 0.0, rfdot = 0.0, rdot = 0.0, r = 0.0, pl = 0.0, elsq = 0.0, esine = 0.0, ecose = 0.0, epw = 0.0,
                cosepw = 0.0, x1m5th = 0.0, xhdot1 = 0.0, tfour = 0.0, sinepw = 0.0, capu = 0.0, ayn = 0.0, xlt = 0.0, aynl = 0.0, xll = 0.0,
                axn = 0.0, xn = 0.0, beta = 0.0, xl = 0.0, e = 0.0, a = 0.0, tcube = 0.0, delm = 0.0, delomg = 0.0, templ = 0.0, tempe = 0.0, tempa = 0.0,
                xnode = 0.0, tsq = 0.0, xmp = 0.0, omega = 0.0, xnoddf = 0.0, omgadf = 0.0, xmdf = 0.0, a1 = 0.0, a3ovk2 = 0.0, ao = 0.0,
                betao = 0.0, betao2 = 0.0, c1sq = 0.0, c2 = 0.0, c3 = 0.0, coef = 0.0, coef1 = 0.0, del1 = 0.0, delo = 0.0, eeta = 0.0, eosq = 0.0,
                etasq = 0.0, perigee = 0.0, pinvsq = 0.0, psisq = 0.0, qoms24 = 0.0, s4 = 0.0, temp = 0.0, temp1 = 0.0, temp2 = 0.0,
                temp3 = 0.0, temp4 = 0.0, temp5 = 0.0, temp6 = 0.0, theta2 = 0.0, theta4 = 0.0, tsi = 0.0;

            var i = 0;

            if (PLib.isFlagClear(PLib.SGP4_INITIALIZED_FLAG))
            {
                PLib.SetFlag(PLib.SGP4_INITIALIZED_FLAG);

                a1 = Math.pow(PLib.xke / tle.xno, PLib.tothrd);
                PLib.SGP4.cosio = Math.cos(tle.xincl);
                theta2 = PLib.SGP4.cosio * PLib.SGP4.cosio;
                PLib.SGP4.x3thm1 = 3 * theta2 - 1.0;
                eosq = tle.eo * tle.eo;
                betao2 = 1.0 - eosq;
                betao = Math.sqrt(betao2);
                del1 = 1.5 * PLib.ck2 * PLib.SGP4.x3thm1 / (a1 * a1 * betao * betao2);
                ao = a1 * (1.0 - del1 * (0.5 * PLib.tothrd + del1 * (1.0 + 134.0 / 81.0 * del1)));
                delo = 1.5 * PLib.ck2 * PLib.SGP4.x3thm1 / (ao * ao * betao * betao2);
                PLib.SGP4.xnodp = tle.xno / (1.0 + delo);
                PLib.SGP4.aodp = ao / (1.0 - delo);

                if ((PLib.SGP4.aodp * (1 - tle.eo) / PLib.ae) < (220 / PLib.xkmper + PLib.ae))
                    PLib.SetFlag(PLib.SIMPLE_FLAG);
                else
                    PLib.ClearFlag(PLib.SIMPLE_FLAG);

                s4 = PLib.s;
                PLib.qoms24 = PLib.qoms2t;
                PLib.perigee = (PLib.SGP4.aodp * (1 - tle.eo) - PLib.ae) * PLib.xkmper;

                if (PLib.perigee < 156.0)
                {
                    if (PLib.perigee <= 98.0)
                        s4 = 20;
                    else
                        s4 = PLib.perigee - 78.0;

                    PLib.qoms24 = Math.pow((120 - s4) * PLib.ae / PLib.xkmper, 4);
                    s4 = s4 / PLib.xkmper + PLib.ae;
                }

                pinvsq = 1 / (PLib.SGP4.aodp * PLib.SGP4.aodp * betao2 * betao2);
                tsi = 1 / (PLib.SGP4.aodp - s4);
                PLib.SGP4.eta = PLib.SGP4.aodp * tle.eo * tsi;
                etasq = PLib.SGP4.eta * PLib.SGP4.eta;
                eeta = tle.eo * PLib.SGP4.eta;
                psisq = Math.abs(1 - etasq);
                coef = qoms24 * Math.pow(tsi, 4);
                coef1 = coef / Math.pow(psisq, 3.5);
                c2 = coef1 * PLib.SGP4.xnodp * (PLib.SGP4.aodp * (1 + 1.5 * etasq + eeta * (4 + etasq)) + 0.75 * PLib.ck2 * tsi / psisq * PLib.SGP4.x3thm1 * (8 + 3 * etasq * (8 + etasq)));
                PLib.SGP4.c1 = tle.bstar * c2;
                PLib.SGP4.sinio = Math.sin(tle.xincl);
                a3ovk2 = -PLib.xj3 / PLib.ck2 * Math.pow(PLib.ae, 3);
                c3 = coef * tsi * a3ovk2 * PLib.SGP4.xnodp * PLib.ae * PLib.SGP4.sinio / tle.eo;
                PLib.SGP4.x1mth2 = 1 - theta2;

                PLib.SGP4.c4 = 2 * PLib.SGP4.xnodp * coef1 * PLib.SGP4.aodp * betao2 * (PLib.SGP4.eta * (2 + 0.5 * etasq)+tle.eo * (0.5 + 2 * etasq) - 2 * PLib.ck2 * tsi / (PLib.SGP4.aodp * psisq) * (-3 * PLib.SGP4.x3thm1 * (1 - 2 * eeta + etasq * (1.5 - 0.5 * eeta)) + 0.75 * PLib.SGP4.x1mth2 * (2 * etasq-eeta * (1 + etasq)) * Math.cos(2 * tle.omegao)));
                PLib.SGP4.c5 = 2 * coef1 * PLib.SGP4.aodp * betao2 * (1 + 2.75 * (etasq + eeta) + eeta * etasq);

                theta4 = theta2 * theta2;
                temp1 = 3 * PLib.ck2 * pinvsq * PLib.SGP4.xnodp;
                temp2 = temp1 * PLib.ck2 * pinvsq;
                temp3 = 1.25 * PLib.ck4 * pinvsq * pinvsq * PLib.SGP4.xnodp;
                PLib.SGP4.xmdot = PLib.SGP4.xnodp + 0.5 * temp1 * betao * PLib.SGP4.x3thm1 + 0.0625 * temp2 * betao * (13 - 78 * theta2 + 137 * theta4);
                x1m5th = 1 - 5 * theta2;
                PLib.SGP4.omgdot = -0.5 * temp1 * x1m5th + 0.0625 * temp2 * (7 - 114 * theta2 + 395 * theta4) + temp3 * (3 - 36 * theta2 + 49 * theta4);
                xhdot1 = -temp1 * PLib.SGP4.cosio;
                PLib.SGP4.xnodot = xhdot1 + (0.5 * temp2 * (4 - 19 * theta2) + 2 * temp3 * (3 - 7 * theta2)) * PLib.SGP4.cosio;
                PLib.SGP4.omgcof = tle.bstar * c3 * Math.cos(tle.omegao);
                PLib.SGP4.xmcof = -PLib.tothrd * coef * tle.bstar * PLib.ae / eeta;
                PLib.SGP4.xnodcf = 3.5 * betao2 * xhdot1 * PLib.SGP4.c1;
                PLib.SGP4.t2cof = 1.5 * PLib.SGP4.c1;
                PLib.SGP4.xlcof = 0.125 * a3ovk2 * PLib.SGP4.sinio * (3 + 5 * PLib.SGP4.cosio) / (1 + PLib.SGP4.cosio);
                PLib.SGP4.aycof = 0.25 * a3ovk2 * PLib.SGP4.sinio;
                PLib.SGP4.delmo = Math.pow(1 + PLib.SGP4.eta * Math.cos(tle.xmo), 3);
                PLib.SGP4.sinmo = Math.sin(tle.xmo);
                PLib.SGP4.x7thm1 = 7 * theta2 - 1;

                if (PLib.isFlagClear(PLib.SIMPLE_FLAG))
                {
                    c1sq = PLib.SGP4.c1 * PLib.SGP4.c1;
                    PLib.SGP4.d2 = 4 * PLib.SGP4.aodp * tsi * c1sq;
                    temp = PLib.SGP4.d2 * tsi * PLib.SGP4.c1/3;
                    PLib.SGP4.d3 = (17 * PLib.SGP4.aodp + s4) * temp;
                    PLib.SGP4.d4 = 0.5 * temp * PLib.SGP4.aodp * tsi * (221 * PLib.SGP4.aodp + 31 * s4) * PLib.SGP4.c1;
                    PLib.SGP4.t3cof = PLib.SGP4.d2 + 2 * c1sq;
                    PLib.SGP4.t4cof = 0.25 * (3 * PLib.SGP4.d3 + PLib.SGP4.c1 * (12 * PLib.SGP4.d2 + 10 * c1sq));
                    PLib.SGP4.t5cof = 0.2 * (3 * PLib.SGP4.d4 + 12 * PLib.SGP4.c1 * PLib.SGP4.d3 + 6 * PLib.SGP4.d2 * PLib.SGP4.d2 + 15 * c1sq * (2 * PLib.SGP4.d2 + c1sq));
                }
            }

            xmdf = tle.xmo + PLib.SGP4.xmdot * tsince;
            omgadf = tle.omegao + PLib.SGP4.omgdot * tsince;
            xnoddf = tle.xnodeo + PLib.SGP4.xnodot * tsince;
            omega = omgadf;
            xmp = xmdf;
            tsq = tsince * tsince;
            xnode = xnoddf + PLib.SGP4.xnodcf * tsq;
            tempa = 1 - PLib.SGP4.c1 * tsince;
            tempe = tle.bstar * PLib.SGP4.c4 * tsince;
            templ = PLib.SGP4.t2cof * tsq;

            if (PLib.isFlagClear(PLib.SIMPLE_FLAG))
            {
                delomg = PLib.SGP4.omgcof * tsince;
                delm = PLib.SGP4.xmcof * (Math.pow(1 + PLib.SGP4.eta * Math.cos(xmdf), 3) - PLib.SGP4.delmo);
                temp = delomg + delm;
                xmp = xmdf + temp;
                omega = omgadf - temp;
                tcube = tsq * tsince;
                tfour = tsince * tcube;
                tempa = tempa - PLib.SGP4.d2 * tsq - PLib.SGP4.d3 * tcube - PLib.SGP4.d4 * tfour;
                tempe = tempe + tle.bstar * PLib.SGP4.c5 * (Math.sin(xmp) - PLib.SGP4.sinmo);
                templ = templ + PLib.SGP4.t3cof * tcube + tfour * (PLib.SGP4.t4cof + tsince * PLib.SGP4.t5cof);
            }

            a = PLib.SGP4.aodp * Math.pow(tempa, 2);
            e = tle.eo - tempe;
            xl = xmp + omega + xnode + PLib.SGP4.xnodp * templ;
            beta = Math.sqrt(1 - e * e);
            xn = PLib.xke / Math.pow(a, 1.5);

            axn = e * Math.cos(omega);
            temp = 1 / (a * beta * beta);
            xll = temp * PLib.SGP4.xlcof * axn;
            aynl = temp * PLib.SGP4.aycof;
            xlt = xl + xll;
            ayn = e * Math.sin(omega) + aynl;

            capu = PLib.FMod2p(xlt - xnode);
            temp2 = capu;
            i = 0;

            do
            {
                sinepw = Math.sin(temp2);
                cosepw = Math.cos(temp2);
                temp3 = axn * sinepw;
                temp4 = ayn * cosepw;
                temp5 = axn * cosepw;
                temp6 = ayn * sinepw;
                epw = (capu - temp4 + temp3 - temp2) / (1 - temp5 - temp6) + temp2;

                if (Math.abs(epw - temp2) <= PLib.e6a)
                    break;

                temp2 = epw;
            } while (i++ < 10);

            ecose = temp5 + temp6;
            esine = temp3 - temp4;
            elsq = axn * axn + ayn * ayn;
            temp = 1 - elsq;
            pl = a * temp;
            r = a * (1 - ecose);
            temp1 = 1 / r;
            rdot = PLib.xke * Math.sqrt(a) * esine * temp1;
            rfdot = PLib.xke * Math.sqrt(pl) * temp1;
            temp2 = a * temp1;
            betal = Math.sqrt(temp);
            temp3 = 1 / (1 + betal);
            cosu = temp2 * (cosepw - axn + ayn * esine * temp3);
            sinu = temp2 * (sinepw - ayn - axn * esine * temp3);
            u = Math.atan2(sinu, cosu);
            sin2u = 2 * sinu * cosu;
            cos2u = 2 * cosu * cosu - 1;
            temp = 1 / pl;
            temp1 = PLib.ck2 * temp;
            temp2 = temp1 * temp;

            rk = r * (1 - 1.5 * temp2 * betal * PLib.SGP4.x3thm1) + 0.5 * temp1 * PLib.SGP4.x1mth2 * cos2u;
            uk = u - 0.25 * temp2 * PLib.SGP4.x7thm1 * sin2u;
            xnodek = xnode + 1.5 * temp2 * PLib.SGP4.cosio * sin2u;
            xinck = tle.xincl + 1.5 * temp2 * PLib.SGP4.cosio * PLib.SGP4.sinio * cos2u;
            rdotk = rdot - xn * temp1 * PLib.SGP4.x1mth2 * sin2u;
            rfdotk = rfdot + xn * temp1 * (PLib.SGP4.x1mth2 * cos2u + 1.5 * PLib.SGP4.x3thm1);

            sinuk = Math.sin(uk);
            cosuk = Math.cos(uk);
            sinik = Math.sin(xinck);
            cosik = Math.cos(xinck);
            sinnok = Math.sin(xnodek);
            cosnok = Math.cos(xnodek);
            xmx = -sinnok * cosik;
            xmy = cosnok * cosik;
            ux = xmx * sinuk+cosnok * cosuk;
            uy = xmy * sinuk+sinnok * cosuk;
            uz = sinik * sinuk;
            vx = xmx * cosuk-cosnok * sinuk;
            vy = xmy * cosuk-sinnok * sinuk;
            vz = sinik * cosuk;

            pos.x = rk * ux;
            pos.y = rk * uy;
            pos.z = rk * uz;
            vel.x = rdotk * ux + rfdotk * vx;
            vel.y = rdotk * uy + rfdotk * vy;
            vel.z = rdotk * uz + rfdotk * vz;

            PLib.phase = xlt - xnode - omgadf + PLib.twopi;

            if (PLib.phase < 0.0)
                PLib.phase += PLib.twopi;

            PLib.phase = PLib.FMod2p(PLib.phase);
        },

        Deep: function(ientry, tle, deep_arg)
        {
            var a1 = 0.0, a2 = 0.0, a3 = 0.0, a4 = 0.0, a5 = 0.0, a6 = 0.0, a7 = 0.0, a8 = 0.0, a9 = 0.0, a10 = 0.0, ainv2 = 0.0, alfdp = 0.0, aqnv = 0.0,
                sgh = 0.0, sini2 = 0.0, sinis = 0.0, sinok = 0.0, sh = 0.0, si = 0.0, sil = 0.0, day = 0.0, betdp = 0.0, dalf = 0.0, bfact = 0.0, c = 0.0,
                cc = 0.0, cosis = 0.0, cosok = 0.0, cosq = 0.0, ctem = 0.0, f322 = 0.0, zx = 0.0, zy = 0.0, dbet = 0.0, dls = 0.0, eoc = 0.0, eq = 0.0, f2 = 0.0,
                f220 = 0.0, f221 = 0.0, f3 = 0.0, f311 = 0.0, f321 = 0.0, xnoh = 0.0, f330 = 0.0, f441 = 0.0, f442 = 0.0, f522 = 0.0, f523 = 0.0,
                f542 = 0.0, f543 = 0.0, g200 = 0.0, g201 = 0.0, g211 = 0.0, pgh = 0.0, ph = 0.0, s1 = 0.0, s2 = 0.0, s3 = 0.0, s4 = 0.0, s5 = 0.0, s6 = 0.0, s7 = 0.0,
                se = 0.0, sel = 0.0, ses = 0.0, xls = 0.0, g300 = 0.0, g310 = 0.0, g322 = 0.0, g410 = 0.0, g422 = 0.0, g520 = 0.0, g521 = 0.0, g532 = 0.0,
                g533 = 0.0, gam = 0.0, sinq = 0.0, sinzf = 0.0, sis = 0.0, sl = 0.0, sll = 0.0, sls = 0.0, stem = 0.0, temp = 0.0, temp1 = 0.0, x1 = 0.0,
                x2 = 0.0, x2li = 0.0, x2omi = 0.0, x3 = 0.0, x4 = 0.0, x5 = 0.0, x6 = 0.0, x7 = 0.0, x8 = 0.0, xl = 0.0, xldot = 0.0, xmao = 0.0, xnddt = 0.0,
                xndot = 0.0, xno2 = 0.0, xnodce = 0.0, xnoi = 0.0, xomi = 0.0, xpidot = 0.0, z1 = 0.0, z11 = 0.0, z12 = 0.0, z13 = 0.0, z2 = 0.0,
                z21 = 0.0, z22 = 0.0, z23 = 0.0, z3 = 0.0, z31 = 0.0, z32 = 0.0, z33 = 0.0, ze = 0.0, zf = 0.0, zm = 0.0, zmo = 0.0, zn = 0.0, zsing = 0.0,
                zsinh = 0.0, zsini = 0.0, zcosg = 0.0, zcosh = 0.0, zcosi = 0.0, delt = 0.0, ft = 0.0;
        
            switch (ientry)
            {
                case dpinit:
                PLib.Deep.thgr = PLib.ThetaG(tle.epoch, deep_arg);
                eq = tle.eo;
                PLib.Deep.xnq = deep_arg.xnodp;
                aqnv = 1 / deep_arg.aodp;
                PLib.Deep.xqncl = tle.xincl;
                xmao = tle.xmo;
                xpidot = deep_arg.omgdot + deep_arg.xnodot;
                sinq = Math.sin(tle.xnodeo);
                cosq = Math.cos(tle.xnodeo);
                PLib.Deep.omegaq = tle.omegao;
        
                day = deep_arg.ds50 + 18261.5;
        
                if (day != PLib.Deep.preep)
                {
                    PLib.Deep.preep = day;
                    xnodce = 4.5236020 - 9.2422029E-4 * day;
                    stem = Math.sin(xnodce);
                    ctem = Math.cos(xnodce);
                    PLib.Deep.zcosil = 0.91375164 - 0.03568096 * ctem;
                    PLib.Deep.zsinil = Math.sqrt(1 - PLib.Deep.zcosil * PLib.Deep.zcosil);
                    PLib.Deep.zsinhl = 0.089683511 * stem / PLib.Deep.zsinil;
                    PLib.Deep.zcoshl = Math.sqrt(1 - PLib.Deep.zsinhl * PLib.Deep.zsinhl);
                    c = 4.7199672 + 0.22997150 * day;
                    gam = 5.8351514 + 0.0019443680 * day;
                    PLib.Deep.zmol = PLib.FMod2p(c - gam);
                    zx = 0.39785416 * stem / PLib.Deep.zsinil;
                    zy = PLib.Deep.zcoshl * ctem + 0.91744867 * PLib.Deep.zsinhl * stem;
                    zx = Math.atan2(zx, zy);
                    zx = gam + zx - xnodce;
                    PLib.Deep.zcosgl = Math.cos(zx);
                    PLib.Deep.zsingl = Math.sin(zx);
                    PLib.Deep.zmos = 6.2565837 + 0.017201977 * day;
                    PLib.Deep.zmos = PLib.FMod2p(PLib.Deep.zmos);
                    }
        
                  PLib.Deep.savtsn = 1E20;
                  zcosg = PLib.zcosgs;
                  zsing = PLib.zsings;
                  zcosi = PLib.zcosis;
                  zsini = PLib.zsinis;
                  zcosh = cosq;
                  zsinh = sinq;
                  cc = PLib.c1ss;
                  zn = PLib.zns;
                  ze = PLib.zes;
                  zmo = PLib.Deep.zmos;
                  xnoi = 1 / PLib.Deep.xnq;
        
                for (;;)
                {
                    a1 = zcosg * zcosh + zsing * zcosi * zsinh;
                    a3 = -zsing * zcosh + zcosg * zcosi * zsinh;
                    a7 = -zcosg * zsinh + zsing * zcosi * zcosh;
                    a8 = zsing * zsini;
                    a9 = zsing * zsinh + zcosg * zcosi * zcosh;
                    a10 = zcosg * zsini;
                    a2 = deep_arg.cosio * a7 + deep_arg.sinio * a8;
                    a4 = deep_arg.cosio * a9 + deep_arg.sinio * a10;
                    a5 = -deep_arg.sinio * a7 + deep_arg.cosio * a8;
                    a6 = -deep_arg.sinio * a9 + deep_arg.cosio * a10;
                    x1 = a1 * deep_arg.cosg + a2 * deep_arg.sing;
                    x2 = a3 * deep_arg.cosg + a4 * deep_arg.sing;
                    x3 = -a1 * deep_arg.sing + a2 * deep_arg.cosg;
                    x4 = -a3 * deep_arg.sing + a4 * deep_arg.cosg;
                    x5 = a5 * deep_arg.sing;
                    x6 = a6 * deep_arg.sing;
                    x7 = a5 * deep_arg.cosg;
                    x8 = a6 * deep_arg.cosg;
                    z31 = 12 * x1 * x1 - 3 * x3 * x3;
                    z32 = 24 * x1 * x2 - 6 * x3 * x4;
                    z33 = 12 * x2 * x2 - 3 * x4 * x4;
                    z1 = 3 * (a1 * a1 + a2 * a2) + z31 * deep_arg.eosq;
                    z2 = 6 * (a1 * a3 + a2 * a4) + z32 * deep_arg.eosq;
                    z3 = 3 * (a3 * a3 + a4 * a4) + z33 * deep_arg.eosq;
                    z11 = -6 * a1 * a5 + deep_arg.eosq * (-24 * x1 * x7 - 6 * x3 * x5);
                    z12 = -6 * (a1 * a6 + a3 * a5) + deep_arg.eosq * (-24 * (x2 * x7 + x1 * x8) - 6 * (x3 * x6 + x4 * x5));
                    z13 = -6 * a3 * a6 + deep_arg.eosq * (-24 * x2 * x8 - 6 * x4 * x6);
                    z21 = 6 * a2 * a5 + deep_arg.eosq * (24 * x1 * x5 - 6 * x3 * x7);
                    z22 = 6 * (a4 * a5 + a2 * a6) + deep_arg.eosq * (24 * (x2 * x5 + x1 * x6) - 6 * (x4 * x7 + x3 * x8));
                    z23 = 6 * a4 * a6 + deep_arg.eosq * (24 * x2 * x6 - 6 * x4 * x8);
                    z1 = z1 + z1 + deep_arg.betao2 * z31;
                    z2 = z2 + z2 + deep_arg.betao2 * z32;
                    z3 = z3 + z3 + deep_arg.betao2 * z33;
                    s3 = cc * xnoi;
                    s2 = -0.5 * s3 / deep_arg.betao;
                    s4 = s3 * deep_arg.betao;
                    s1 = -15 * eq * s4;
                    s5 = x1 * x3 + x2 * x4;
                    s6 = x2 * x3 + x1 * x4;
                    s7 = x2 * x4 - x1 * x3;
                    se = s1 * zn * s5;
                    si = s2 * zn * (z11 + z13);
                    sl = -zn * s3 * (z1 + z3 - 14 - 6 * deep_arg.eosq);
                    sgh = s4 * zn * (z31 + z33 - 6);
                    sh = -zn * s2 * (z21 + z23);
        
                    if (PLib.Deep.xqncl < 5.2359877E-2)
                        sh = 0;
        
                    PLib.Deep.ee2 = 2 * s1 * s6;
                    PLib.Deep.e3 = 2 * s1 * s7;
                    PLib.Deep.xi2 = 2 * s2 * z12;
                    PLib.Deep.xi3 = 2 * s2 * (z13 - z11);
                    PLib.Deep.xl2 = -2 * s3 * z2;
                    PLib.Deep.xl3 = -2 * s3 * (z3 - z1);
                    PLib.Deep.xl4 = -2 * s3 * (-21 - 9 * deep_arg.eosq) * ze;
                    PLib.Deep.xgh2 = 2 * s4 * z32;
                    PLib.Deep.xgh3 = 2 * s4 * (z33 - z31);
                    PLib.Deep.xgh4 = -18 * s4 * ze;
                    PLib.Deep.xh2 = -2 * s2 * z22;
                    PLib.Deep.xh3 = -2 * s2  * (z23 - z21);
        
                    if (PLib.isFlagSet(PLib.LUNAR_TERMS_DONE_FLAG))
                        break;
        
                    PLib.Deep.sse = se;
                    PLib.Deep.ssi = si;
                    PLib.Deep.ssl = sl;
                    PLib.Deep.ssh = sh / deep_arg.sinio;
                    PLib.Deep.ssg = sgh - deep_arg.cosio * PLib.Deep.ssh;
                    PLib.Deep.se2 = PLib.Deep.ee2;
                    PLib.Deep.si2 = PLib.Deep.xi2;
                    PLib.Deep.sl2 = PLib.Deep.xl2;
                    PLib.Deep.sgh2 = PLib.Deep.xgh2;
                    PLib.Deep.sh2 = PLib.Deep.xh2;
                    PLib.Deep.se3 = PLib.Deep.e3;
                    PLib.Deep.si3 = PLib.Deep.xi3;
                    PLib.Deep.sl3 = PLib.Deep.xl3;
                    PLib.Deep.sgh3 = PLib.Deep.xgh3;
                    PLib.Deep.sh3 = PLib.Deep.xh3;
                    PLib.Deep.sl4 = PLib.Deep.xl4;
                    PLib.Deep.sgh4 = PLib.Deep.xgh4;
                    zcosg = PLib.Deep.zcosgl;
                    zsing = PLib.Deep.zsingl;
                    zcosi = PLib.Deep.zcosil;
                    zsini = PLib.Deep.zsinil;
                    zcosh = PLib.Deep.zcoshl * cosq + PLib.Deep.zsinhl * sinq;
                    zsinh = sinq * PLib.Deep.zcoshl - cosq * PLib.Deep.zsinhl;
                    zn = PLib.znl;
                    cc = PLib.c1l;
                    ze = PLib.zel;
                    zmo = PLib.Deep.zmol;
                    PLib.SetFlag(PLib.LUNAR_TERMS_DONE_FLAG);
                }
        
                PLib.Deep.sse = PLib.Deep.sse + se;
                PLib.Deep.ssi = PLib.Deep.ssi + si;
                PLib.Deep.ssl = PLib.Deep.ssl + sl;
                PLib.Deep.ssg = PLib.Deep.ssg + sgh - deep_arg.cosio / deep_arg.sinio * sh;
                PLib.Deep.ssh = PLib.Deep.ssh + sh / deep_arg.sinio;
        
                PLib.ClearFlag(PLib.RESONANCE_FLAG);
                PLib.ClearFlag(PLib.SYNCHRONOUS_FLAG);
        
                if (!((PLib.Deep.xnq < 0.0052359877) && (PLib.Deep.xnq > 0.0034906585)))
                {
                    if ((PLib.Deep.xnq < 0.00826) || (PLib.Deep.xnq > 0.00924))
                        return;
        
                    if (eq < 0.5)
                        return;
        
                    PLib.SetFlag(PLib.RESONANCE_FLAG);
                    eoc = eq * deep_arg.eosq;
                    g201 = -0.306 - (eq - 0.64) * 0.440;
        
                    if (eq <= 0.65)
                    {
                        g211 = 3.616 - 13.247 * eq + 16.290 * deep_arg.eosq;
                        g310 = -19.302 + 117.390 * eq - 228.419 * deep_arg.eosq + 156.591 * eoc;
                        g322 = -18.9068 + 109.7927 * eq - 214.6334 * deep_arg.eosq + 146.5816 * eoc;
                        g410 = -41.122 + 242.694 * eq - 471.094 * deep_arg.eosq + 313.953 * eoc;
                        g422 = -146.407 + 841.880 * eq - 1629.014 * deep_arg.eosq + 1083.435 * eoc;
                        g520 = -532.114 + 3017.977 * eq - 5740 * deep_arg.eosq + 3708.276 * eoc;
                    }
        
                    else
                    {
                        g211 = -72.099 + 331.819 * eq - 508.738 * deep_arg.eosq + 266.724 * eoc;
                        g310 = -346.844 + 1582.851 * eq - 2415.925 * deep_arg.eosq + 1246.113 * eoc;
                        g322 = -342.585 + 1554.908 * eq - 2366.899 * deep_arg.eosq + 1215.972 * eoc;
                        g410 = -1052.797 + 4758.686 * eq - 7193.992 * deep_arg.eosq + 3651.957 * eoc;
                        g422 = -3581.69 + 16178.11 * eq - 24462.77 * deep_arg.eosq + 12422.52 * eoc;
        
                        if (eq <= 0.715)
                            g520 = 1464.74 - 4664.75 * eq + 3763.64 * deep_arg.eosq;
        
                        else
                            g520 = -5149.66 + 29936.92 * eq - 54087.36 * deep_arg.eosq + 31324.56 * eoc;
                    }
        
                    if (eq < 0.7)
                    {
                        g533 = -919.2277 + 4988.61 * eq - 9064.77 * deep_arg.eosq + 5542.21 * eoc;
                        g521 = -822.71072 + 4568.6173 * eq - 8491.4146 * deep_arg.eosq + 5337.524 * eoc;
                        g532 = -853.666 + 4690.25 * eq - 8624.77 * deep_arg.eosq + 5341.4 * eoc;
                    }
        
                    else
                    {
                        g533 = -37995.78 + 161616.52 * eq - 229838.2 * deep_arg.eosq + 109377.94 * eoc;
                        g521 = -51752.104 + 218913.95 * eq - 309468.16 * deep_arg.eosq + 146349.42 * eoc;
                        g532 = -40023.88 + 170470.89 * eq - 242699.48 * deep_arg.eosq + 115605.82 * eoc;
                    }
        
                    sini2 = deep_arg.sinio * deep_arg.sinio;
                    f220 = 0.75 * (1 + 2 * deep_arg.cosio + deep_arg.theta2);
                    f221 = 1.5 * sini2;
                    f321 = 1.875 * deep_arg.sinio * (1 - 2 * deep_arg.cosio - 3 * deep_arg.theta2);
                    f322 = -1.875 * deep_arg.sinio * (1 + 2 * deep_arg.cosio - 3 * deep_arg.theta2);
                    f441 = 35 * sini2 * f220;
                    f442 = 39.3750 * sini2 * sini2;
                    f522 = 9.84375 * deep_arg.sinio * (sini2 * (1 - 2 * deep_arg.cosio - 5 * deep_arg.theta2) + 0.33333333 * (-2 + 4 * deep_arg.cosio + 6 * deep_arg.theta2));
                    f523 = deep_arg.sinio * (4.92187512 * sini2 * (-2 - 4 * deep_arg.cosio + 10 * deep_arg.theta2) + 6.56250012 * (1 + 2 * deep_arg.cosio-3 * deep_arg.theta2));
                    f542 = 29.53125 * deep_arg.sinio * (2 - 8 * deep_arg.cosio + deep_arg.theta2 * (-12 + 8 * deep_arg.cosio+10 * deep_arg.theta2));
                    f543 = 29.53125 * deep_arg.sinio * (-2 - 8 * deep_arg.cosio + deep_arg.theta2 * (12 + 8 * deep_arg.cosio-10 * deep_arg.theta2));
                    xno2 = PLib.Deep.xnq * PLib.Deep.xnq;
                    ainv2 = aqnv * aqnv;
                    temp1 = 3 * xno2 * ainv2;
                    temp = temp1 * PLib.root22;
                    PLib.Deep.d2201 = temp * f220 * g201;
                    PLib.Deep.d2211 = temp * f221 * g211;
                    temp1 = temp1 * aqnv;
                    temp = temp1 * PLib.root32;
                    PLib.Deep.d3210 = temp * f321 * g310;
                    PLib.Deep.d3222 = temp * f322 * g322;
                    temp1 = temp1 * aqnv;
                    temp = 2 * temp1 * PLib.root44;
                    PLib.Deep.d4410 = temp * f441 * g410;
                    PLib.Deep.d4422 = temp * f442 * g422;
                    temp1 = temp1 * aqnv;
                    temp = temp1 * PLib.root52;
                    PLib.Deep.d5220 = temp * f522 * g520;
                    PLib.Deep.d5232 = temp * f523 * g532;
                    temp = 2 * temp1 * PLib.root54;
                    PLib.Deep.d5421 = temp * f542 * g521;
                    PLib.Deep.d5433 = temp * f543 * g533;
                    PLib.Deep.xlamo = xmao + tle.xnodeo + tle.xnodeo - PLib.Deep.thgr - PLib.Deep.thgr;
                    bfact = deep_arg.xmdot + deep_arg.xnodot + deep_arg.xnodot - PLib.thdt - PLib.thdt;
                    bfact = bfact + PLib.Deep.ssl + PLib.Deep.ssh + PLib.Deep.ssh;
                }
        
                else
                {
                    PLib.SetFlag(PLib.RESONANCE_FLAG);
                    PLib.SetFlag(PLib.SYNCHRONOUS_FLAG);
        
                    g200 = 1 + deep_arg.eosq * (-2.5 + 0.8125 * deep_arg.eosq);
                    g310 = 1 + 2 * deep_arg.eosq;
                    g300 = 1 + deep_arg.eosq * (-6 + 6.60937 * deep_arg.eosq);
                    f220 = 0.75 * (1 + deep_arg.cosio) * (1 + deep_arg.cosio);
                    f311 = 0.9375 * deep_arg.sinio * deep_arg.sinio * (1 + 3 * deep_arg.cosio) - 0.75 * (1 + deep_arg.cosio);
                    f330 = 1 + deep_arg.cosio;
                    f330 = 1.875 * f330 * f330 * f330;
                    PLib.Deep.del1 = 3 * PLib.Deep.xnq * PLib.Deep.xnq * aqnv * aqnv;
                    PLib.Deep.del2 = 2 * PLib.Deep.del1 * f220 * g200 * q22;
                    PLib.Deep.del3 = 3 * PLib.Deep.del1 * f330 * g300 * q33 * aqnv;
                    PLib.Deep.del1 = PLib.Deep.del1 * f311 * g310 * q31 * aqnv;
                    PLib.Deep.fasx2 = 0.13130908;
                    PLib.Deep.fasx4 = 2.8843198;
                    PLib.Deep.fasx6 = 0.37448087;
                    PLib.Deep.xlamo = xmao + tle.xnodeo + tle.omegao - PLib.Deep.thgr;
                    bfact = deep_arg.xmdot + xpidot - PLib.thdt;
                    bfact = bfact + PLib.Deep.ssl + PLib.Deep.ssg + PLib.Deep.ssh;
                }
        
                PLib.Deep.xfact = bfact - PLib.Deep.xnq;
        
                PLib.Deep.xli = PLib.Deep.xlamo;
                PLib.Deep.xni = PLib.Deep.xnq;
                PLib.Deep.atime = 0;
                PLib.Deep.stepp = 720;
                PLib.Deep.stepn = -720;
                PLib.Deep.step2 = 259200;
        
                return;
        
                case dpsec:  /* Entrance for deep space secular effects */
                deep_arg.xll = deep_arg.xll + PLib.Deep.ssl * deep_arg.t;
                deep_arg.omgadf = deep_arg.omgadf + PLib.Deep.ssg * deep_arg.t;
                deep_arg.xnode = deep_arg.xnode + PLib.Deep.ssh * deep_arg.t;
                deep_arg.em = tle.eo + PLib.Deep.sse * deep_arg.t;
                deep_arg.xinc = tle.xincl + PLib.Deep.ssi * deep_arg.t;
        
                if (deep_arg.xinc < 0)
                {
                    deep_arg.xinc = -deep_arg.xinc;
                    deep_arg.xnode = deep_arg.xnode + pi;
                    deep_arg.omgadf = deep_arg.omgadf - pi;
                }
        
                if (PLib.isFlagClear(PLib.RESONANCE_FLAG))
                      return;
        
                do
                {
                    if ((PLib.Deep.atime == 0) || ((deep_arg.t >= 0) && (PLib.Deep.atime < 0)) || ((deep_arg.t < 0) && (PLib.Deep.atime >= 0)))
                    {
                        if (deep_arg.t >= 0)
                            delt = PLib.Deep.stepp;
                        else
                            delt = PLib.Deep.stepn;
        
                        PLib.Deep.atime = 0;
                        PLib.Deep.xni = PLib.Deep.xnq;
                        PLib.Deep.xli = PLib.Deep.xlamo;
                    }
        
                    else
                    {
                        if (Math.abs(deep_arg.t) >= Math.abs(PLib.Deep.atime))
                        {
                            if (deep_arg.t > 0)
                                delt = PLib.Deep.stepp;
                            else
                                delt = PLib.Deep.stepn;
                        }
                    }
        
                    do
                    {
                        if (Math.abs(deep_arg.t - PLib.Deep.atime) >= PLib.Deep.stepp)
                        {
                            PLib.SetFlag(PLib.DO_LOOP_FLAG);
                            PLib.ClearFlag(PLib.EPOCH_RESTART_FLAG);
                        }
        
                        else
                        {
                            ft = deep_arg.t - PLib.Deep.atime;
                            PLib.ClearFlag(PLib.DO_LOOP_FLAG);
                        }
        
                        if (Math.abs(deep_arg.t) < Math.abs(PLib.Deep.atime))
                        {
                            if (deep_arg.t >= 0)
                                delt = PLib.Deep.stepn;
                            else
                                delt = PLib.Deep.stepp;
        
                            PLib.SetFlag(PLib.DO_LOOP_FLAG | PLib.EPOCH_RESTART_FLAG);
                        }
        
                        if (PLib.isFlagSet(PLib.SYNCHRONOUS_FLAG))
                        {
                            xndot = PLib.Deep.del1 * Math.sin(PLib.Deep.xli - PLib.Deep.fasx2) + PLib.Deep.del2 * Math.sin(2 * (PLib.Deep.xli - PLib.Deep.fasx4)) + PLib.Deep.del3 * Math.sin(3 * (PLib.Deep.xli - PLib.Deep.fasx6));
                            xnddt = PLib.Deep.del1 * Math.cos(PLib.Deep.xli - PLib.Deep.fasx2) + 2 * PLib.Deep.del2 * Math.cos(2 * (PLib.Deep.xli - PLib.Deep.fasx4)) + 3 * PLib.Deep.del3 * Math.cos(3 * (PLib.Deep.xli - PLib.Deep.fasx6));
                        }
        
                        else
                        {
                            xomi = PLib.Deep.omegaq + deep_arg.omgdot * PLib.Deep.atime;
                            x2omi = xomi + xomi;
                            x2li = PLib.Deep.xli + PLib.Deep.xli;
                            xndot = PLib.Deep.d2201 * Math.sin(x2omi + PLib.Deep.xli - g22) + PLib.Deep.d2211 * Math.sin(PLib.Deep.xli - g22) + PLib.Deep.d3210 * Math.sin(xomi + PLib.Deep.xli - g32) + PLib.Deep.d3222 * Math.sin(-xomi + PLib.Deep.xli - g32) + PLib.Deep.d4410 * sin(x2omi + x2li - g44) + PLib.Deep.d4422 * sin(x2li - g44) + PLib.Deep.d5220 * sin(xomi + PLib.Deep.xli - g52) + PLib.Deep.d5232 * sin(-xomi + PLib.Deep.xli - g52) + PLib.Deep.d5421 * sin(xomi + x2li - g54) + PLib.Deep.d5433 * sin(-xomi + x2li - g54);
                            xnddt = PLib.Deep.d2201 * Math.cos(x2omi + PLib.Deep.xli - g22) + PLib.Deep.d2211 * Math.cos(PLib.Deep.xli - g22) + PLib.Deep.d3210 * Math.cos(xomi + PLib.Deep.xli - g32) + PLib.Deep.d3222 * Math.cos(-xomi + PLib.Deep.xli - g32) + PLib.Deep.d5220 * cos(xomi + PLib.Deep.xli - g52) + PLib.Deep.d5232 * cos(-xomi + PLib.Deep.xli - g52) + 2 * (PLib.Deep.d4410 * cos(x2omi + x2li - g44) + PLib.Deep.d4422 * cos(x2li - g44) + PLib.Deep.d5421 * cos(xomi + x2li - g54) + PLib.Deep.d5433 * cos(-xomi + x2li - g54));
                        }
        
                        xldot = PLib.Deep.xni + PLib.Deep.xfact;
                        xnddt = xnddt * xldot;
        
                        if (PLib.isFlagSet(PLib.DO_LOOP_FLAG))
                        {
                            PLib.Deep.xli = PLib.Deep.xli + xldot * delt + xndot * PLib.Deep.step2;
                            PLib.Deep.xni = PLib.Deep.xni + xndot * delt + xnddt * PLib.Deep.step2;
                            PLib.Deep.atime = PLib.Deep.atime + delt;
                        }
                    } while (PLib.isFlagSet(PLib.DO_LOOP_FLAG) && PLib.isFlagClear(PLib.EPOCH_RESTART_FLAG));
                } while (PLib.isFlagSet(PLib.DO_LOOP_FLAG) && PLib.isFlagSet(PLib.EPOCH_RESTART_FLAG));
        
                deep_arg.xn = PLib.Deep.xni + xndot * ft + xnddt * ft * ft * 0.5;
                xl = PLib.Deep.xli + xldot * ft + xndot * ft * ft * 0.5;
                temp = -deep_arg.xnode + PLib.Deep.thgr + deep_arg.t * PLib.thdt;
        
                if (PLib.isFlagClear(PLib.SYNCHRONOUS_FLAG))
                    deep_arg.xll = xl + temp + temp;
                else
                    deep_arg.xll = xl - deep_arg.omgadf + temp;
        
                return;
        
                case dpper:
                sinis = Math.sin(deep_arg.xinc);
                cosis = Math.cos(deep_arg.xinc);
        
                if (Math.abs(PLib.Deep.savtsn - deep_arg.t) >= 30)
                {
                    PLib.Deep.savtsn = deep_arg.t;
                    zm = PLib.Deep.zmos + PLib.zns * deep_arg.t;
                    zf = zm + 2 * PLib.zes * Math.sin(zm);
                    sinzf = Math.sin(zf);
                    f2 = 0.5 * sinzf * sinzf-0.25;
                    f3 = -0.5 * sinzf * Math.cos(zf);
                    ses = PLib.Deep.se2 * f2 + PLib.Deep.se3 * f3;
                    sis = PLib.Deep.si2 * f2 + PLib.Deep.si3 * f3;
                    sls = PLib.Deep.sl2 * f2 + PLib.Deep.sl3 * f3 + PLib.Deep.sl4 * sinzf;
                    PLib.Deep.sghs = PLib.Deep.sgh2 * f2 + PLib.Deep.sgh3 * f3 + PLib.Deep.sgh4 * sinzf;
                    PLib.Deep.shs = PLib.Deep.sh2 * f2 + PLib.Deep.sh3 * f3;
                    zm = PLib.Deep.zmol + PLib.znl * deep_arg.t;
                    zf = zm + 2 * zel * Math.sin(zm);
                    sinzf = Math.sin(zf);
                    f2 = 0.5 * sinzf * sinzf - 0.25;
                    f3 = -0.5 * sinzf * Math.cos(zf);
                    sel = PLib.Deep.ee2 * f2 + PLib.Deep.e3 * f3;
                    sil = PLib.Deep.xi2 * f2 + PLib.Deep.xi3 * f3;
                    sll = PLib.Deep.xl2 * f2 + PLib.Deep.xl3 * f3 + PLib.Deep.xl4 * sinzf;
                    PLib.Deep.sghl = PLib.Deep.xgh2 * f2 + PLib.Deep.xgh3 * f3 + PLib.Deep.xgh4 * sinzf;
                    PLib.Deep.sh1 = PLib.Deep.xh2 * f2 + PLib.Deep.xh3 * f3;
                    PLib.Deep.pe = ses + sel;
                    PLib.Deep.pinc = sis + sil;
                    PLib.Deep.pl = sls + sll;
                }
        
                pgh = PLib.Deep.sghs + PLib.Deep.sghl;
                ph = PLib.Deep.shs + PLib.Deep.sh1;
                deep_arg.xinc = deep_arg.xinc + PLib.Deep.pinc;
                deep_arg.em = deep_arg.em + PLib.Deep.pe;
        
                if (PLib.Deep.xqncl >= 0.2)
                {
                    ph = ph / deep_arg.sinio;
                    pgh = pgh - deep_arg.cosio * ph;
                    deep_arg.omgadf = deep_arg.omgadf + pgh;
                    deep_arg.xnode = deep_arg.xnode + ph;
                    deep_arg.xll = deep_arg.xll + PLib.Deep.pl;
                }
        
                else
                {
                    sinok = Math.sin(deep_arg.xnode);
                    cosok = Math.cos(deep_arg.xnode);
                    alfdp = sinis * sinok;
                    betdp = sinis * cosok;
                    dalf = ph * cosok + PLib.Deep.pinc * cosis * sinok;
                    dbet = -ph * sinok + PLib.Deep.pinc * cosis * cosok;
                    alfdp = alfdp + dalf;
                    betdp = betdp + dbet;
                    deep_arg.xnode = FMod2p(deep_arg.xnode);
                    xls = deep_arg.xll + deep_arg.omgadf + cosis * deep_arg.xnode;
                    dls = PLib.Deep.pl + pgh - PLib.Deep.pinc * deep_arg.xnode * sinis;
                    xls = xls + dls;
                    xnoh = deep_arg.xnode;
                    deep_arg.xnode = Math.atan2(alfdp, betdp);
        
                    if (Math.abs(xnoh - deep_arg.xnode) > PLib.pi)
                    {
                          if (deep_arg.xnode < xnoh)
                          deep_arg.xnode += PLib.twopi;
                          else
                          deep_arg.xnode -= PLib.twopi;
                    }
        
                    deep_arg.xll = deep_arg.xll + PLib.Deep.pl;
                    deep_arg.omgadf = xls - deep_arg.xll - Math.cos(deep_arg.xinc) * deep_arg.xnode;
                }
                return;
            }
        },
        
        SDP4: function(tsince, tle, pos, vel)
        {
            var i = 0;
        
            var a = 0.0, axn = 0.0, ayn = 0.0, aynl = 0.0, beta = 0.0, betal = 0.0, capu = 0.0, cos2u = 0.0, cosepw = 0.0, cosik = 0.0,
                cosnok = 0.0, cosu = 0.0, cosuk = 0.0, ecose = 0.0, elsq = 0.0, epw = 0.0, esine = 0.0, pl = 0.0, theta4 = 0.0, rdot = 0.0,
                rdotk = 0.0, rfdot = 0.0, rfdotk = 0.0, rk = 0.0, sin2u = 0.0, sinepw = 0.0, sinik = 0.0, sinnok = 0.0, sinu = 0.0,
                sinuk = 0.0, tempe = 0.0, templ = 0.0, tsq = 0.0, u = 0.0, uk = 0.0, ux = 0.0, uy = 0.0, uz = 0.0, vx = 0.0, vy = 0.0, vz = 0.0, xinck = 0.0, xl = 0.0,
                xlt = 0.0, xmam = 0.0, xmdf = 0.0, xmx = 0.0, xmy = 0.0, xnoddf = 0.0, xnodek = 0.0, xll = 0.0, a1 = 0.0, a3ovk2 = 0.0, ao = 0.0, c2 = 0.0,
                coef = 0.0, coef1 = 0.0, x1m5th = 0.0, xhdot1 = 0.0, del1 = 0.0, r = 0.0, delo = 0.0, eeta = 0.0, eta = 0.0, etasq = 0.0,
                perigee = 0.0, psisq = 0.0, tsi = 0.0, qoms24 = 0.0, s4 = 0.0, pinvsq = 0.0, temp = 0.0, tempa = 0.0, temp1 = 0.0,
                temp2 = 0.0, temp3 = 0.0, temp4 = 0.0, temp5 = 0.0, temp6 = 0.0, bx = 0.0, by = 0.0, bz = 0.0, cx = 0.0, cy = 0.0, cz = 0.0;
        
            PLib.SDP4.deep_arg = PLib.SDP4.deep_arg || new PLib.deep_arg_t();
        
            if (PLib.isFlagClear(PLib.SDP4_INITIALIZED_FLAG))
            {
                PLib.SetFlag(PLib.SDP4_INITIALIZED_FLAG);
        
                a1 = Math.pow(PLib.xke / tle.xno, PLib.tothrd);
                PLib.SDP4.deep_arg.cosio = Math.cos(tle.xincl);
                PLib.SDP4.deep_arg.theta2 = PLib.SDP4.deep_arg.cosio * PLib.SDP4.deep_arg.cosio;
                PLib.SDP4.x3thm1 = 3 * PLib.SDP4.deep_arg.theta2 - 1;
                PLib.SDP4.deep_arg.eosq = tle.eo * tle.eo;
                PLib.SDP4.deep_arg.betao2 = 1 - PLib.SDP4.deep_arg.eosq;
                PLib.SDP4.deep_arg.betao = Math.sqrt(PLib.SDP4.deep_arg.betao2);
                del1 = 1.5 * PLib.ck2 * PLib.SDP4.x3thm1 / (a1 * a1 * PLib.SDP4.deep_arg.betao * PLib.SDP4.deep_arg.betao2);
                ao = a1 * (1 - del1 * (0.5 * PLib.tothrd + del1 * (1 + 134 / 81 * del1)));
                delo = 1.5 * PLib.ck2 * PLib.SDP4.x3thm1 / (ao * ao * PLib.SDP4.deep_arg.betao * PLib.SDP4.deep_arg.betao2);
                PLib.SDP4.deep_arg.xnodp = tle.xno / (1 + delo);
                PLib.SDP4.deep_arg.aodp = ao / (1 - delo);
        
                s4 = s;
                qoms24 = PLib.qoms2t;
                perigee = (PLib.SDP4.deep_arg.aodp * (1 - tle.eo) - PLib.ae) * PLib.xkmper;
             
                if (perigee < 156.0)
                {
                    if (perigee <= 98.0)
                        s4 = 20.0;
                    else
                        s4 = perigee - 78.0;
        
                    qoms24 = Math.pow((120 - s4) * PLib.ae / xkmper,4);
                    s4 = s4 / PLib.xkmper + PLib.ae;
                }
        
                pinvsq = 1 / (PLib.SDP4.deep_arg.aodp * PLib.SDP4.deep_arg.aodp * PLib.SDP4.deep_arg.betao2 * PLib.SDP4.deep_arg.betao2);
                PLib.SDP4.deep_arg.sing = Math.sin(tle.omegao);
                PLib.SDP4.deep_arg.cosg = Math.cos(tle.omegao);
                tsi = 1 / (PLib.SDP4.deep_arg.aodp - s4);
                eta = PLib.SDP4.deep_arg.aodp * tle.eo * tsi;
                etasq = eta * eta;
                eeta = tle.eo * eta;
                psisq = Math.abs(1 - etasq);
                coef = qoms24 * Math.pow(tsi, 4);
                coef1 = coef / Math.pow(psisq, 3.5);
                c2 = coef1 * PLib.SDP4.deep_arg.xnodp * (PLib.SDP4.deep_arg.aodp * (1 + 1.5 * etasq + eeta * (4 + etasq)) + 0.75 * PLib.ck2 * tsi / psisq * PLib.SDP4.x3thm1 * (8 + 3 * etasq * (8 + etasq)));
                PLib.SDP4.c1 = tle.bstar * c2;
                PLib.SDP4.deep_arg.sinio = Math.sin(tle.xincl);
                a3ovk2 = -xj3 / ck2 * Math.pow(ae, 3);
                PLib.SDP4.x1mth2 = 1 -PLib.SDP4.deep_arg.theta2;
                PLib.SDP4.c4 = 2 * PLib.SDP4.deep_arg.xnodp * coef1 * PLib.SDP4.deep_arg.aodp * PLib.SDP4.deep_arg.betao2 * (eta * (2 + 0.5 * etasq) + tle.eo * (0.5 + 2 * etasq) - 2 * PLib.ck2 * tsi / (PLib.SDP4.deep_arg.aodp * psisq) * (-3 * PLib.SDP4.x3thm1 * (1 - 2 * eeta + etasq * (1.5 - 0.5 * eeta)) + 0.75 * PLib.SDP4.x1mth2 * (2 * etasq - eeta * (1 + etasq)) * Math.cos(2 * tle.omegao)));
                theta4 = PLib.SDP4.deep_arg.theta2 * PLib.SDP4.deep_arg.theta2;
                temp1 = 3 * PLib.ck2 * pinvsq * PLib.SDP4.deep_arg.xnodp;
                temp2 = temp1 * PLib.ck2 * pinvsq;
                temp3 = 1.25 * PLib.ck4 * pinvsq * pinvsq * PLib.SDP4.deep_arg.xnodp;
                PLib.SDP4.deep_arg.xmdot = PLib.SDP4.deep_arg.xnodp + 0.5 * temp1 * PLib.SDP4.deep_arg.betao * PLib.SDP4.x3thm1 + 0.0625 * temp2 * PLib.SDP4.deep_arg.betao * (13 - 78 * PLib.SDP4.deep_arg.theta2 + 137 * theta4);
                x1m5th = 1 - 5 * PLib.SDP4.deep_arg.theta2;
                PLib.SDP4.deep_arg.omgdot = -0.5 * temp1 * x1m5th + 0.0625 * temp2 * (7 - 114 * PLib.SDP4.deep_arg.theta2 + 395 * theta4) + temp3 * (3 - 36 * PLib.SDP4.deep_arg.theta2 + 49 * theta4);
                xhdot1 = -temp1 * PLib.SDP4.deep_arg.cosio;
                PLib.SDP4.deep_arg.xnodot = xhdot1 + (0.5 * temp2 * (4 - 19 * PLib.SDP4.deep_arg.theta2) + 2 * temp3 * (3 - 7 * PLib.SDP4.deep_arg.theta2)) * PLib.SDP4.deep_arg.cosio;
                PLib.SDP4.xnodcf = 3.5 * PLib.SDP4.deep_arg.betao2 * xhdot1 * PLib.SDP4.c1;
                PLib.SDP4.t2cof = 1.5 * PLib.SDP4.c1;
                PLib.SDP4.xlcof = 0.125 * a3ovk2 * PLib.SDP4.deep_arg.sinio * (3 + 5 * PLib.SDP4.deep_arg.cosio) / (1 + PLib.SDP4.deep_arg.cosio);
                PLib.SDP4.aycof = 0.25 * a3ovk2 * PLib.SDP4.deep_arg.sinio;
                PLib.SDP4.x7thm1 = 7 * PLib.SDP4.deep_arg.theta2 - 1;
        
                Deep(dpinit, tle, PLib.SDP4.deep_arg);
            }
        
            xmdf = tle.xmo + PLib.SDP4.deep_arg.xmdot * tsince;
            PLib.SDP4.deep_arg.omgadf = tle.omegao + PLib.SDP4.deep_arg.omgdot * tsince;
            xnoddf = tle.xnodeo + PLib.SDP4.deep_arg.xnodot * tsince;
            tsq = tsince * tsince;
            PLib.SDP4.deep_arg.xnode = xnoddf + PLib.SDP4.xnodcf * tsq;
            tempa = 1 - PLib.SDP4.c1 * tsince;
            tempe = tle.bstar * PLib.SDP4.c4 * tsince;
            templ = PLib.SDP4.t2cof * tsq;
            PLib.SDP4.deep_arg.xn = PLib.SDP4.deep_arg.xnodp;
        
            PLib.SDP4.deep_arg.xll = xmdf;
            PLib.SDP4.deep_arg.t = tsince;
        
            Deep(dpsec, tle, PLib.SDP4.deep_arg);
        
            xmdf = PLib.SDP4.deep_arg.xll;
            a = Math.pow(PLib.xke / PLib.SDP4.deep_arg.xn, PLib.tothrd) * tempa * tempa;
            PLib.SDP4.deep_arg.em = PLib.SDP4.deep_arg.em - tempe;
            xmam = xmdf + PLib.SDP4.deep_arg.xnodp * templ;
        
            PLib.SDP4.deep_arg.xll = xmam;
        
            Deep(PLib.dpper, tle, PLib.SDP4.deep_arg);
        
            xmam = PLib.SDP4.deep_arg.xll;
            xl = xmam + PLib.SDP4.deep_arg.omgadf + PLib.SDP4.deep_arg.xnode;
            beta = Math.sqrt(1 - PLib.SDP4.deep_arg.em * PLib.SDP4.deep_arg.em);
            PLib.SDP4.deep_arg.xn = PLib.xke / Math.pow(a, 1.5);
        
            axn = PLib.SDP4.deep_arg.em * Math.cos(PLib.SDP4.deep_arg.omgadf);
            temp = 1 / (a * beta * beta);
            xll = temp * PLib.SDP4.xlcof * axn;
            aynl = temp * PLib.SDP4.aycof;
            xlt = xl + xll;
            ayn = PLib.SDP4.deep_arg.em * Math.sin(PLib.SDP4.deep_arg.omgadf) + aynl;
        
            capu = FMod2p(xlt - PLib.SDP4.deep_arg.xnode);
            temp2 = capu;
            i = 0;
        
            do
            {
                sinepw = Math.sin(temp2);
                cosepw = Math.cos(temp2);
                temp3 = axn * sinepw;
                temp4 = ayn * cosepw;
                temp5 = axn * cosepw;
                temp6 = ayn * sinepw;
                epw = (capu - temp4 + temp3 - temp2) / (1 - temp5 - temp6) + temp2;
        
                if (Math.abs(epw - temp2) <= e6a)
                    break;
        
                temp2 = epw;
        
            } while (i++ < 10);
        
            ecose = temp5 + temp6;
            esine = temp3 - temp4;
            elsq = axn * axn + ayn * ayn;
            temp = 1 - elsq;
            pl = a * temp;
            r = a * (1 - ecose);
            temp1 = 1 / r;
            rdot = PLib.xke * Math.sqrt(a) * esine * temp1;
            rfdot = PLib.xke * Math.sqrt(pl) * temp1;
            temp2 = a * temp1;
            betal = Math.sqrt(temp);
            temp3 = 1 / (1 + betal);
            cosu = temp2 * (cosepw - axn + ayn * esine * temp3);
            sinu = temp2 * (sinepw - ayn - axn * esine * temp3);
            u = Math.atan2(sinu, cosu);
            sin2u = 2 * sinu * cosu;
            cos2u = 2 * cosu * cosu - 1;
            temp = 1 / pl;
            temp1 = PLib.ck2 * temp;
            temp2 = temp1 * temp;
        
            rk = r * (1 - 1.5 * temp2 * betal * PLib.SDP4.x3thm1) + 0.5 * temp1 * PLib.SDP4.x1mth2 * cos2u;
            uk = u - 0.25 * temp2 * PLib.SDP4.x7thm1 * sin2u;
            xnodek = PLib.SDP4.deep_arg.xnode + 1.5 * temp2 * PLib.SDP4.deep_arg.cosio * sin2u;
            xinck = PLib.SDP4.deep_arg.xinc + 1.5 * temp2 * PLib.SDP4.deep_arg.cosio * PLib.SDP4.deep_arg.sinio * cos2u;
            rdotk = rdot - PLib.SDP4.deep_arg.xn * temp1 * PLib.SDP4.x1mth2 * sin2u;
            rfdotk = rfdot + PLib.SDP4.deep_arg.xn * temp1 * (PLib.SDP4.x1mth2 * cos2u + 1.5 * PLib.SDP4.x3thm1);
        
            sinuk = Math.sin(uk);
            cosuk = Math.cos(uk);
            sinik = Math.sin(xinck);
            cosik = Math.cos(xinck);
            sinnok = Math.sin(xnodek);
            cosnok = Math.cos(xnodek);
            xmx = -sinnok * cosik;
            xmy = cosnok * cosik;
            ux = xmx * sinuk + cosnok * cosuk;
            uy = xmy * sinuk + sinnok * cosuk;
            uz = sinik * sinuk;
            vx = xmx * cosuk - cosnok * sinuk;
            vy = xmy * cosuk - sinnok * sinuk;
            vz = sinik * cosuk;
        
            pos.x = rk * ux;
            pos.y = rk * uy;
            pos.z = rk * uz;
            vel.x = rdotk * ux + rfdotk * vx;
            vel.y = rdotk * uy + rfdotk * vy;
            vel.z = rdotk * uz + rfdotk * vz;
        
            PLib.phase = xlt - PLib.SDP4.deep_arg.xnode - PLib.SDP4.deep_arg.omgadf + PLib.twopi;
        
            if (PLib.phase < 0.0)
                PLib.phase += PLib.twopi;
        
            PLib.phase = PLib.FMod2p(PLib.phase);
        },
        
        Calculate_User_PosVel: function(time, geodetic, obs_pos, obs_vel)
        {
            var c = 0.0, sq = 0.0, achcp = 0.0;
        
            geodetic.theta = PLib.FMod2p(PLib.ThetaG_JD(time) + geodetic.lon);
            c = 1 / Math.sqrt(1 + PLib.f * (PLib.f - 2) * PLib.Sqr(Math.sin(geodetic.lat)));
            sq = PLib.Sqr(1 - PLib.f) * c;
            achcp = (PLib.xkmper * c + geodetic.alt) * Math.cos(geodetic.lat);
            obs_pos.x = achcp * Math.cos(geodetic.theta);
            obs_pos.y = achcp * Math.sin(geodetic.theta);
            obs_pos.z = (PLib.xkmper * sq + geodetic.alt) * Math.sin(geodetic.lat);
            obs_vel.x = -PLib.mfactor * obs_pos.y;
            obs_vel.y = PLib.mfactor * obs_pos.x;
            obs_vel.z = 0;
            PLib.Magnitude(obs_pos);
            PLib.Magnitude(obs_vel);
        },
        
        Calculate_LatLonAlt: function(time, pos, geodetic)
        {
            var r = 0.0, e2 = 0.0, phi = 0.0, c = 0.0;
        
            geodetic.theta = Math.atan2(pos.y, pos.x);
            geodetic.lon = PLib.FMod2p(geodetic.theta - PLib.ThetaG_JD(time));
            r = Math.sqrt(PLib.Sqr(pos.x) + PLib.Sqr(pos.y));
            e2 = PLib.f * (2 - PLib.f);
            geodetic.lat = Math.atan2(pos.z, r);
        
            do
            {
                phi = geodetic.lat;
                c = 1 / Math.sqrt(1 - e2 * PLib.Sqr(Math.sin(phi)));
                geodetic.lat = Math.atan2(pos.z + PLib.xkmper * c * e2 * Math.sin(phi), r);
        
            } while (Math.abs(geodetic.lat - phi) >= 1E-10);
        
            geodetic.alt = r / Math.cos(geodetic.lat) - PLib.xkmper * c;
        
            if (geodetic.lat > PLib.pio2)
                geodetic.lat -= PLib.twopi;
        },
        
        Calculate_Obs: function(time, pos, vel, geodetic, obs_set)
        {
            var sin_lat = 0.0, cos_lat = 0.0, sin_theta = 0.0, cos_theta = 0.0, el = 0.0, azim = 0.0, top_s = 0.0, top_e = 0.0, top_z = 0.0;
        
            var obs_pos = new PLib.vector_t();
            var obs_vel = new PLib.vector_t();
            var range = new PLib.vector_t();
            var rgvel = new PLib.vector_t();
        
            PLib.Calculate_User_PosVel(time, geodetic, obs_pos, obs_vel);
        
            range.x = pos.x - obs_pos.x;
            range.y = pos.y - obs_pos.y;
            range.z = pos.z - obs_pos.z;
        
            rx = range.x;
            ry = range.y;
            rz = range.z;
        
            rgvel.x = vel.x - obs_vel.x;
            rgvel.y = vel.y - obs_vel.y;
            rgvel.z = vel.z - obs_vel.z;
        
            PLib.Magnitude(range);
        
            sin_lat = Math.sin(geodetic.lat);
            cos_lat = Math.cos(geodetic.lat);
            sin_theta = Math.sin(geodetic.theta);
            cos_theta = Math.cos(geodetic.theta);
            top_s = sin_lat * cos_theta * range.x + sin_lat * sin_theta * range.y - cos_lat * range.z;
            top_e = -sin_theta * range.x + cos_theta * range.y;
            top_z = cos_lat * cos_theta * range.x+cos_lat * sin_theta * range.y + sin_lat * range.z;
            azim = Math.atan(-top_e / top_s);
        
            if (top_s > 0.0)
                azim = azim + PLib.pi;
        
            if (azim < 0.0)
                azim = azim + PLib.twopi;
        
            el = Math.asin(top_z / range.w);
            obs_set.x = azim;
            obs_set.y = el;
            obs_set.z = range.w;
        
            obs_set.w = PLib.Dot(range, rgvel) / range.w;
        
            obs_set.y = el;
        
            if (obs_set.y >= 0.0)
                PLib.SetFlag(PLib.VISIBLE_FLAG);
            else
            {
                obs_set.y = el;
                PLib.ClearFlag(PLib.VISIBLE_FLAG);
            }
        },
        
        InternalUpdate: function(x)
        {
            var tempnum;
        
            PLib.sat[x].designator = PLib.sat[x].line1.substring(9, 17);
            PLib.sat[x].catnum = PLib.sat[x].line1.substring(2, 7);
            PLib.sat[x].year = PLib.sat[x].line1.substring(18, 20);
            PLib.sat[x].refepoch = PLib.sat[x].line1.substring(20, 32);
            tempnum = 1.0e-5 * PLib.sat[x].line1.substring(44, 50);
            PLib.sat[x].nddot6 = tempnum / Math.pow(10.0, PLib.sat[x].line1.charAt(51));
            tempnum = 1.0e-5 * PLib.sat[x].line1.substring(53, 59);
            PLib.sat[x].bstar = tempnum / Math.pow(10.0, PLib.sat[x].line1.charAt(60));
            PLib.sat[x].setnum = PLib.sat[x].line1.substring(64, 68);
            PLib.sat[x].incl = PLib.sat[x].line2.substring(8, 16);
            PLib.sat[x].raan = PLib.sat[x].line2.substring(17, 25);
            PLib.sat[x].eccn = 1.0e-07 * PLib.sat[x].line2.substring(26,33);
            PLib.sat[x].argper = PLib.sat[x].line2.substring(34, 42);
            PLib.sat[x].meanan = PLib.sat[x].line2.substring(43, 51);
            PLib.sat[x].meanmo = PLib.sat[x].line2.substring(52, 63);
            PLib.sat[x].drag = PLib.sat[x].line1.substring(33, 43);
            PLib.sat[x].orbitnum = PLib.sat[x].line2.substring(63, 68);
        },

        InitializeData: function()
        {
            for (var z = 0; z < PLib.tleData.length; z++)
            {
                PLib.sat[z] = new PLib.sat_t();
                PLib.sat[z].name = PLib.tleData[z][0];
                PLib.sat[z].line1 = PLib.tleData[z][1];
                PLib.sat[z].line2 = PLib.tleData[z][2];
                PLib.InternalUpdate(z);                
            }
        },

        DayNum: function(m, d, y)
        {
            var dn = 0;
            var mm = 0.0, yy = 0.0;
        
            if (m < 3)
            {
                y--;
                m += 12;
            }
        
            if (y <= 50)
                y += 100;
        
            yy = y;
            mm = m;
            dn = (Math.floor(365.25 * (yy - 80.0)) - Math.floor(19.0 + yy / 100.0) + Math.floor(4.75 + yy / 400.0) - 16.0);
            dn += d + 30 * m + Math.floor(0.6 * mm - 0.3);
            
            return dn;
        },
        
        CurrentDaynum: function()
        {
            var d = new Date();
            return (d.getTime() - 315446400000) / 86400000;
        },
        
        Daynum2Date: function(daynum)
        {
            var d = new Date();
            d.setTime(daynum * 86400000 + 315446400000);
            var x = d + 1;
            return d;
        },

        PreCalc: function(x)
        {
            PLib.tle.sat_name = PLib.sat[x].name
            PLib.tle.idesg = PLib.sat[x].designator;
            PLib.tle.catnr = PLib.sat[x].catnum;
            PLib.tle.epoch = (1000.0 * PLib.sat[x].year) + PLib.sat[x].refepoch * 1;
            PLib.tle.xndt2o = PLib.sat[x].drag;
            PLib.tle.xndd6o = PLib.sat[x].nddot6;
            PLib.tle.bstar = PLib.sat[x].bstar;
            PLib.tle.xincl = PLib.sat[x].incl;
            PLib.tle.xnodeo = PLib.sat[x].raan;
            PLib.tle.eo = PLib.sat[x].eccn;
            PLib.tle.omegao = PLib.sat[x].argper;
            PLib.tle.xmo = PLib.sat[x].meanan;
            PLib.tle.xno = PLib.sat[x].meanmo;
            PLib.tle.revnum = PLib.sat[x].orbitnum;
        
            PLib.ClearFlag(PLib.ALL_FLAGS);
            PLib.select_ephemeris(PLib.tle);
        },

        Calc: function()
        {
            var zero_vector = new PLib.vector_t();
            var vel = new PLib.vector_t();
            var pos = new PLib.vector_t();
            var obs_set = new PLib.vector_t();
            var solar_vector = new PLib.vector_t();
            var solar_set = new PLib.vector_t();
        
            var sat_geodetic = new PLib.geodetic_t();
        
            PLib.jul_utc = PLib.daynum + 2444238.5;
        
            PLib.jul_epoch = PLib.Julian_Date_of_Epoch(PLib.tle.epoch);
            PLib.tsince = (PLib.jul_utc - PLib.jul_epoch) * PLib.xmnpda;
            PLib.age = PLib.jul_utc - PLib.jul_epoch;
        
            if (PLib.isFlagSet(PLib.DEEP_SPACE_EPHEM_FLAG))
                PLib.ephem = "SDP4";
            else
                PLib.ephem = "SGP4";
        
            if (PLib.isFlagSet(PLib.DEEP_SPACE_EPHEM_FLAG))
                PLib.SDP4(PLib.tsince, PLib.tle, pos, vel);
            else
                PLib.SGP4(PLib.tsince, PLib.tle, pos, vel);
        
            PLib.Convert_Sat_State(pos, vel);
        
            PLib.Magnitude(vel);
            PLib.sat_vel = vel.w;
        
            PLib.Calculate_Obs(PLib.jul_utc, pos, vel, PLib.obs_geodetic, obs_set);
        
            PLib.Calculate_LatLonAlt(PLib.jul_utc, pos, sat_geodetic);
        
            PLib.Calculate_Solar_Position(PLib.jul_utc, solar_vector);
            PLib.Calculate_Obs(PLib.jul_utc, solar_vector, zero_vector, PLib.obs_geodetic, solar_set);
        
            if (PLib.Sat_Eclipsed(pos, solar_vector))
                PLib.SetFlag(PLib.SAT_ECLIPSED_FLAG);
            else
                PLib.ClearFlag(PLib.SAT_ECLIPSED_FLAG);
        
            if (PLib.isFlagSet(PLib.SAT_ECLIPSED_FLAG))
                PLib.sat_sun_status = 0;
            else
                PLib.sat_sun_status = 1;
        
            PLib.sat_azi = PLib.Degrees(obs_set.x);
            PLib.sat_ele = PLib.Degrees(obs_set.y);
            PLib.sat_range = obs_set.z;
            PLib.sat_range_rate = obs_set.w;
            PLib.sat_lat = PLib.Degrees(sat_geodetic.lat);
            PLib.sat_lon = PLib.Degrees(sat_geodetic.lon);
            PLib.sat_alt = sat_geodetic.alt;
        
            PLib.fk = 12756.33 * Math.acos(PLib.xkmper / (PLib.xkmper + PLib.sat_alt));
            PLib.fm = PLib.fk / 1.609344;
        
            PLib.rv = Math.floor((PLib.tle.xno * PLib.xmnpda / PLib.twopi + PLib.age * PLib.tle.bstar * PLib.ae) * PLib.age + PLib.tle.xmo / PLib.twopi) + parseInt(PLib.tle.revnum);
        
            PLib.sun_azi = PLib.Degrees(solar_set.x);
            PLib.sun_ele = PLib.Degrees(solar_set.y);
        
            PLib.irk = Math.round(PLib.sat_range);
            PLib.isplat = Math.round(PLib.sat_lat);
            PLib.isplong = Math.round(360.0 - PLib.sat_lon);
            PLib.iaz = Math.round(PLib.sat_azi);
            PLib.iel = Math.round(PLib.sat_ele);
            PLib.ma256 = Math.round(256.0 * (PLib.phase / PLib.twopi));
        
            if (PLib.sat_sun_status)
            {
                if (PLib.sun_ele <= -12.0 && PLib.sat_ele >= 0.0)
                    PLib.findsun = 'Visible';
                else
                    PLib.findsun = 'Daylight';
            }
            else
                PLib.findsun = 'Eclipsed';
        },
        
        AosHappens: function(x)
        {
            var lin = 0.0, sma = 0.0, apogee = 0.0;
        
            if (PLib.sat[x].meanmo == 0.0)
                return 0;
            else
            {
                lin = PLib.sat[x].incl;
        
                if (lin >= 90.0)
                    lin = 180.0 - lin;
        
                sma = 331.25 * Math.exp(Math.log(1440.0 / PLib.sat[x].meanmo) * (2.0 / 3.0));
                apogee = sma * (1.0 + PLib.sat[x].eccn) - PLib.xkmper;
        
                if ((Math.acos(PLib.xkmper / (apogee + PLib.xkmper)) + (lin * PLib.deg2rad)) > Math.abs(PLib.qth.stnlat * PLib.deg2rad))
                    return 1;
                else
                    return 0;
            }
        },
    
        Decayed: function(x, time)
        {
            var satepoch = 0.0;
        
            if (time == 0.0)
                time = PLib.CurrentDaynum();
        
            satepoch = PLib.DayNum(1, 0, PLib.sat[x].year) + PLib.sat[x].refepoch;
        
            if (satepoch + ((16.666666 - PLib.sat[x].meanmo) / (10.0 * Math.abs(PLib.sat[x].drag))) < time)
                return 1;
            else
                return 0;
        },
    
        Geostationary: function(x)
        {
            if (Math.abs(PLib.sat[x].meanmo - 1.0027) < 0.0002) 
                return 1;
            else
                return 0;
        },
    
        FindAOS: function()
        {
            PLib.aostime = 0.0;
        
            if (PLib.AosHappens(indx) && PLib.Geostationary(indx) == 0 && PLib.Decayed(indx, PLib.daynum) == 0)
            {
                PLib.Calc();
        
                while (PLib.sat_ele < -1.0)
                {
                    PLib.daynum -= 0.00035 * (PLib.sat_ele * (((PLib.sat_alt / 8400.0) + 0.46)) - 2.0);
                    PLib.Calc();
                }
        
                while (PLib.aostime == 0.0)
                {
                    if (Math.abs(PLib.sat_ele) < 0.03)
                        PLib.aostime = PLib.daynum;
                    else
                    {
                        PLib.daynum -= PLib.sat_ele * Math.sqrt(PLib.sat_alt) / 530000.0;
                        PLib.Calc();
                    }
                }
            }
        
            return PLib.aostime;
        },
    
        FindLOS: function()
        {
            PLib.lostime = 0.0;
        
            if (PLib.Geostationary(indx) == 0 && PLib.AosHappens(indx) == 1 && PLib.Decayed(indx, PLib.daynum) == 0)
            {
                PLib.Calc();
        
                do
                {
                    PLib.daynum += PLib.sat_ele * Math.sqrt(PLib.sat_alt) / 502500.0;
                    PLib.Calc();
        
                    if (Math.abs(PLib.sat_ele) < 0.03)
                        PLib.lostime = PLib.daynum;
        
                } while (PLib.lostime == 0.0);
            }
        
            return PLib.lostime;
        },

        QuickFind: function(satname)
        {
            var satInfo = new Object();

            for (var z = 0; z < PLib.sat.length; z++)
            {
                if ((PLib.sat[z].name == satname) || (satname == PLib.sat[z].catnum))
                {
                    PLib.daynum = PLib.CurrentDaynum();
                    PLib.PreCalc(z);
                    PLib.Calc();
                         
                    if (PLib.Decayed(z, PLib.daynum) == 0)
                    {
                        satInfo.satname = satname;
                        satInfo.dateTime = PLib.Daynum2Date(PLib.daynum);
                        satInfo.elevation = PLib.sat_ele;
                        satInfo.azimuth = PLib.sat_azi;
                        satInfo.orbitalPhase = PLib.ma256;
                        satInfo.latitude = PLib.isplat;
                        satInfo.altitude = PLib.sat_alt;
                        satInfo.velocity = PLib.sat_vel;
                        satInfo.mode = PLib.ephem;
        
                        var lng = 360 - PLib.isplong;
                        if (lng > 180) lng = -PLib.isplong;
                        satInfo.longitude = lng;

                        satInfo.slantRange = PLib.irk;
                        satInfo.orbitNumber = PLib.rv;
                        satInfo.visibility = PLib.findsun;

                        satInfo.orbit = new Array();
                        
  /*      var increment = 0.00035;
        //increment = increment * 3;                        
        while (satInfo.orbitNumber === PLib.rv) {
            PLib.daynum -= increment;
            PLib.Calc();
        }
        
        PLib.daynum += increment;
        PLib.Calc();
        
        while (satInfo.orbitNumber === PLib.rv) {
            PLib.daynum += increment;
            PLib.Calc();
            
            var orbitPoint = new Object();
            orbitPoint.dateTime = PLib.Daynum2Date(PLib.daynum);
            orbitPoint.elevation = PLib.sat_ele;
            orbitPoint.azimuth = PLib.sat_azi;
            orbitPoint.orbitalPhase = PLib.ma256;
            orbitPoint.latitude = PLib.isplat;
            orbitPoint.altitude = PLib.sat_alt;
            orbitPoint.velocity = PLib.sat_vel;
            orbitPoint.mode = PLib.ephem;

            var lng = 360 - PLib.isplong;
            if (lng > 180) lng = -PLib.isplong;
            orbitPoint.longitude = lng;

            orbitPoint.slantRange = PLib.irk;
            orbitPoint.orbitNumber = PLib.rv;
            orbitPoint.visibility = PLib.findsun;
            
            satInfo.orbit.push(orbitPoint);
        } */       
                    }
        
                    break;
                }
            }

            return satInfo;
        },

        formatDateOnly: function(dt)
        {
            var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
            return months[dt.getMonth()] + " " + dt.getDate();
        },

        formatTimeOnly: function(dt)
        {
            var h = dt.getHours();
            var m = dt.getMinutes();

            var amPm = h < 12 ? "AM" : "PM"

            h = h > 12 ? h - 12 : h;
            h = h == 0 ? h = 12 : h;
            m = m < 10 ? "0" + m : m;

            return h + ":" + m + amPm;
        },

        extractDate: function(dt)
        {
            var d = new Date();
            d.setTime(dt.valueOf());
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            d.setMilliseconds(0);

            return d;
        },

        addDay: function(dt)
        {
            var d = new Date(dt.getTime() + 86400000);
            return d;
        },

        getTodaysPasses: function()
        {
            var satInfoColl = new Array();
            var arrIdx = 0;
            var x = 0, y = 0, z = 0, lastel = 0;
            var start = 0, now = 0;

            for (z = 0; z < PLib.sat.length; z++)
            {
                indx = z;

                now = (3651.0 + PLib.CurrentDaynum()) * 86400.0;

                if (start == 0)
                    start = now;

                if ((start >= now - 31557600) && (start <= now + 31557600))
                {
                    PLib.daynum = (start / 86400.0) - 3651.0;
                    PLib.PreCalc(indx);
                    PLib.Calc();

                    var d = new Date();
                    var passNo = 1;

                    if (PLib.AosHappens(indx) && PLib.Geostationary(indx) == 0 && PLib.Decayed(indx, PLib.daynum) == 0)
                    {
                        PLib.daynum = PLib.FindAOS();

                        while (PLib.Daynum2Date(PLib.daynum) < PLib.addDay(d))
                        {
                            var satInfo = new Object();

                            satInfo.number = z + 1;
                            satInfo.name = PLib.sat[z].name;
                            satInfo.passNo = passNo++;
                            satInfo.dateTimeStart = PLib.Daynum2Date(PLib.daynum);
                            satInfo.peakElevation = PLib.iel;
                            satInfo.riseAzimuth
                                = satInfo.peakAzimuth
                                = PLib.iaz;
                            satInfo.orbitalPhase = PLib.ma256;
                            satInfo.latitude = PLib.isplat;

                            var lng = 360 - PLib.isplong;
                            if (lng > 180) lng = -PLib.isplong;
                            satInfo.longitude = lng;

                            satInfo.riseRange
                                = satInfo.peakRange
                                = PLib.irk;
                            satInfo.orbitNumber = PLib.rv;

                            var plusCount = 0;
                            var asteriskCount = 0;

                            while (PLib.iel >= 0)
                            {
                                if (PLib.iel > satInfo.peakElevation)
                                {
                                    satInfo.peakElevation = PLib.iel;
                                    satInfo.peakAzimuth = PLib.iaz;
                                    satInfo.peakRange = PLib.irk;
                                }

                                if (PLib.findsun == '+')
                                    plusCount++;
                                else if (PLib.findsun == '*')
                                    asteriskCount++;

                                lastel = PLib.iel;
                                PLib.daynum += Math.cos((PLib.sat_ele - 1.0) * PLib.deg2rad) * Math.sqrt(PLib.sat_alt) / 25000.0;
                                PLib.Calc();
                            }

                            if (lastel != 0)
                            {
                                PLib.daynum = PLib.FindLOS();
                                PLib.Calc();
                            }

                            satInfo.dateTimeEnd = PLib.Daynum2Date(PLib.daynum);
                            satInfo.decayAzimuth = PLib.iaz;
                            satInfo.decayRange = PLib.irk;

                            if ((plusCount > 3) || (plusCount > 2 && asteriskCount > 2))
                            {
                                satInfo.visibility = '+';
                            }
                            else if (asteriskCount > 2)
                            {
                                satInfo.visibility = '*';
                            }

                            satInfoColl[arrIdx++] = satInfo;

                            PLib.daynum += (1 / 24 / 6);
                            PLib.daynum = PLib.FindAOS();
                        } 
                    }
                }
            }

            return satInfoColl;
        },

        configureGroundStation: function(lat, lng)
        {
            PLib.qth.stnlat = lat;

            if (lng < 0) PLib.qth.stnlong = -lng;
                else PLib.qth.stnlong = 360 - lng;

            PLib.obs_geodetic.lat = PLib.qth.stnlat * PLib.deg2rad;
            PLib.obs_geodetic.lon = -PLib.qth.stnlong * PLib.deg2rad;
            PLib.obs_geodetic.alt = PLib.qth.stnalt / 1000.0;
            PLib.obs_geodetic.theta = 0.0;
        }
    };

PLib.obs_geodetic = new PLib.geodetic_t();
PLib.tle = new PLib.tle_t();


PLib.tleData =
    [[
        "ISS (ZARYA)",
        "1 25544U 98067A   15086.17334635  .00015434  00000-0  22972-3 0  9994",
        "2 25544  51.6460 133.7315 0007136 144.2025 255.6332 15.55307244935270"
    ],
    [
        "OSCAR 7 (AO-7)",
        "1 07530U 74089B   15085.49439727 -.00000011  00000-0  20217-3 0  9995",
        "2 07530 101.5126  63.4285 0012358 103.5423  10.7417 12.53612923846897"
    ]];
    
    

PLib.tleData =  [["OSCAR 7 (AO-7)          ","1 07530U 74089B   15085.49439727 -.00000011  00000-0  20217-3 0  9995","2 07530 101.5126  63.4285 0012358 103.5423  10.7417 12.53612923846897"],["UOSAT 2 (UO-11)         ","1 14781U 84021B   15086.15365304  .00001225  00000-0  15993-3 0  9993","2 14781  97.8114 145.2217 0008155 348.3096  11.7927 14.82247134669876"],["LUSAT (LO-19)           ","1 20442U 90005G   15085.79584273  .00000244  00000-0  10549-3 0  9992","2 20442  98.5062  23.0324 0012567  36.9182 323.2864 14.32704584315148"],["ITAMSAT (IO-26)         ","1 22826U 93061D   15086.11593543  .00000251  00000-0  11414-3 0  9992","2 22826  98.6946  36.4208 0008932 173.8349 186.2944 14.30166407121352"],["RADIO ROSTO (RS-15)     ","1 23439U 94085A   15084.63882209 -.00000033  00000-0  28060-3 0  9999","2 23439  64.8154  96.5812 0151423  28.2076 332.6948 11.27562826833732"],["JAS-2 (FO-29)           ","1 24278U 96046B   15085.86029150 -.00000002  00000-0  37122-4 0  9990","2 24278  98.5318  65.8204 0349399 284.3399 191.1371 13.53047887918893"],["TECHSAT 1B (GO-32)      ","1 25397U 98043D   15084.95075457  .00000129  00000-0  75188-4 0  9995","2 25397  98.5109  38.0429 0001182 151.3774 248.8738 14.23527860867959"],["ISS (ZARYA)             ","1 25544U 98067A   15086.17334635  .00015434  00000-0  22972-3 0  9994","2 25544  51.6460 133.7315 0007136 144.2025 255.6332 15.55307244935270"],["PCSAT (NO-44)           ","1 26931U 01043C   15085.84841541  .00000244  00000-0  12572-3 0  9993","2 26931  67.0528  29.4808 0006417 264.1463  95.8906 14.30279252704021"],["SAUDISAT 1C (SO-50)     ","1 27607U 02058C   15085.50586164  .00001534  00000-0  23997-3 0  9997","2 27607  64.5540  91.2313 0077071 304.5861  54.7986 14.74553481659096"],["CUTE-1 (CO-55)          ","1 27844U 03031E   15085.99649459  .00000429  00000-0  21495-3 0  9995","2 27844  98.6976  95.6927 0009878 171.6626 241.4529 14.21745959608762"],["CUBESAT XI-IV (CO-57)   ","1 27848U 03031J   15085.59278229  .00000324  00000-0  16846-3 0  9996","2 27848  98.7073  95.1588 0009605 179.9806 331.2912 14.21400183608617"],["MOZHAYETS 4 (RS-22)     ","1 27939U 03042A   15086.03590772  .00001168  00000-0  22176-3 0  9999","2 27939  97.8332 251.6338 0012250 290.6673  69.3212 14.65888444614157"],["HAMSAT (VO-52)          ","1 28650U 05017B   15085.80257281  .00003545  00000-0  39961-3 0  9994","2 28650  97.5722  82.0342 0022898 306.9917  52.9203 14.87015676535209"],["CUBESAT XI-V (CO-58)    ","1 28895U 05043F   15086.10411306  .00001564  00000-0  31588-3 0  9994","2 28895  97.8229 278.1670 0016850 192.4978 167.5809 14.62606789501597"],["CUTE-1.7+APD II (CO-65) ","1 32785U 08021C   15085.81381477  .00002427  00000-0  27953-3 0  9998","2 32785  97.6594 132.3835 0012865 344.8482 141.4601 14.86551628373991"],["DELFI-C3 (DO-64)        ","1 32789U 08021G   15086.16076382  .00010784  00000-0  90649-3 0  9994","2 32789  97.6811 147.4374 0010251 301.0607 114.5719 14.98422501374793"],["SEEDS II (CO-66)        ","1 32791U 08021J   15085.81430973  .00003661  00000-0  40089-3 0  9997","2 32791  97.6610 134.0894 0013184 337.8836  22.1811 14.88317679374066"],["YUBILEINY (RS-30)       ","1 32953U 08025A   15086.22059566  .00000010  00000-0 -13620-7 0  9993","2 32953  82.5069  25.2107 0017584 259.9669  99.9422 12.43058067310423"],["PRISM (HITOMI)          ","1 33493U 09002B   15086.12554554  .00004626  00000-0  45591-3 0  9999","2 33493  98.2531 279.5537 0015768 237.6750 122.2951 14.92480790334339"],["KKS-1 (KISEKI)          ","1 33499U 09002H   15085.52391819  .00001706  00000-0  26547-3 0  9997","2 33499  98.2232 221.5540 0010533  88.4620 339.2909 14.74301916331430"],["SWISSCUBE               ","1 35932U 09051B   15085.46070453  .00001439  00000-0  34322-3 0  9999","2 35932  98.3976 203.7012 0007079 226.9556 133.1049 14.55215913291930"],["BEESAT                  ","1 35933U 09051C   15085.80699923  .00001254  00000-0  29916-3 0  9995","2 35933  98.3985 204.9298 0005002 239.1032 120.9673 14.55430484292074"],["ITUPSAT 1               ","1 35935U 09051E   15084.32517875  .00001039  00000-0  25389-3 0  9999","2 35935  98.4087 203.6810 0007419 235.1335 124.9164 14.54676926291735"],["XIWANG-1 (HOPE-1)       ","1 36122U 09072B   15086.08104948 -.00000060  00000-0 -43517-4 0  9998","2 36122 100.2040 133.7805 0007170 310.4492  49.6026 13.16325179253654"],["TISAT 1                 ","1 36799U 10035E   15086.18741816  .00004943  00000-0  54467-3 0  9998","2 36799  98.0115 185.6634 0014369 115.4868 306.1622 14.87924167254762"],["JUGNU                   ","1 37839U 11058B   15085.08029280  .00000491  00000-0  12009-3 0  9992","2 37839  19.9622 346.3261 0019113 209.9848 285.4615 14.12438680178454"],["SRMSAT                  ","1 37841U 11058D   15085.19123683  .00000468  00000-0  11289-3 0  9992","2 37841  19.9728  10.6650 0012045 140.5919   8.6407 14.10456050178221"],["M-CUBED & EXP-1 PRIME   ","1 37855U 11061F   15085.14184165  .00007722  00000-0  47360-3 0  9997","2 37855 101.7189 257.3195 0199670 315.6462  42.8896 14.95559955184735"],["HORYU 2                 ","1 38340U 12025D   15085.85015693  .00003070  00000-0  47518-3 0  9992","2 38340  98.3048  53.7184 0012233   5.9629 354.1722 14.73946856153402"],["AAUSAT3                 ","1 39087U 13009B   15086.12008961  .00000692  00000-0  25825-3 0  9999","2 39087  98.6079 284.7906 0012363 186.5860 173.5155 14.35005931108886"],["STRAND-1                ","1 39090U 13009E   15085.10835700  .00000273  00000-0  11188-3 0  9991","2 39090  98.6141 284.2703 0009071 184.8344 175.2755 14.34747035108736"],["BEESAT-3                ","1 39134U 13015E   15085.84453549  .00009552  00000-0  57709-3 0  9993","2 39134  64.8741 320.7057 0033836 262.0382  97.6900 15.10685890106250"],["BEESAT-2                ","1 39136U 13015G   15086.08186415  .00009106  00000-0  57168-3 0  9991","2 39136  64.8749 321.7250 0034249 261.8507  97.8730 15.09310674106268"],["CUBEBUG-1 (CAPITAN BETO)","1 39153U 13018D   15086.16125876  .00002696  00000-0  37168-3 0  9991","2 39153  98.0188 170.7707 0018149 154.8335 205.3765 14.78926544103358"],["ZACUBE-1 (TSHEPISOSAT)  ","1 39417U 13066B   15086.16487565  .00002603  00000-0  34482-3 0  9997","2 39417  97.7383 151.7398 0061683  44.8861 315.7315 14.79401313 72504"],["TRITON-1                ","1 39427U 13066M   15086.13079704  .00002149  00000-0  35863-3 0  9996","2 39427  97.7252 141.6783 0117587  69.4409 291.9366 14.66409385 71842"],["GOMX 1                  ","1 39430U 13066Q   15086.12966100  .00001676  00000-0  31871-3 0  9993","2 39430  97.7185 135.1335 0155591  88.2875 273.6141 14.57812507 71421"],["HUMSAT-D                ","1 39433U 13066T   15086.14994511  .00005380  00000-0  57423-3 0  9992","2 39433  97.7463 158.3372 0033406  35.2780 325.0639 14.88823819 72908"],["EAGLE 2                 ","1 39436U 13066W   15086.13979223  .00034906  00000-0  26173-2 0  9990","2 39436  97.7522 162.0384 0023069  24.3823 335.8487 15.02357231 73158"],["VELOX-PII               ","1 39438U 13066Y   15086.13030377  .00002141  00000-0  30153-3 0  9990","2 39438  97.7355 149.5390 0073406  49.5646 311.1936 14.76459220 72351"],["CUBEBUG-2 (LO-74)       ","1 39440U 13066AA  15086.15322788  .00002528  00000-0  36883-3 0  9990","2 39440  97.7333 147.7547 0083567  53.6692 307.2195 14.74245679 72240"],["FUNCUBE-1 (AO-73)       ","1 39444U 13066AE  15086.15664906  .00003123  00000-0  40801-3 0  9992","2 39444  97.7386 151.9075 0061104  44.3261 316.2820 14.79864219 71287"],["UWE-3                   ","1 39446U 13066AG  15086.15410360  .00002579  00000-0  35947-3 0  9996","2 39446  97.7354 149.6569 0073057  49.1911 311.5605 14.76733288 71143"],["SPROUT                  ","1 39770U 14029E   15086.04060623  .00002013  00000-0  25056-3 0  9990","2 39770  97.8670 184.0112 0011259 108.3774 251.8661 14.83565425 45450"],["DUCHIFAT-1              ","1 40021U 14033M   15086.19073164  .00003394  00000-0  38026-3 0  9990","2 40021  97.9610 346.5366 0015417  92.7571 267.5431 14.87448615 41611"]];

    var homeLat = 52.389899799999995;
    var homeLng = 0.260787;
    PLib.InitializeData();
    PLib.configureGroundStation(homeLat, homeLng);
    
     
function calc() {

    var satInfo;
    var result = [];
    for (var i = 0; i < PLib.sat.length; i++) {
        satInfo = PLib.QuickFind(PLib.sat[i].name);
        result.push(satInfo);

    }
    self.postMessage(JSON.stringify(result));
        
    setTimeout(calc, 100);
}

setTimeout(calc, 100);     