import * as bootstrap from "bootstrap";
import * as Popper from "@popperjs/core";
import IMask from "imask";
import { Datepicker, DateRangePicker } from "vanillajs-datepicker";
import ru from "vanillajs-datepicker/locales/ru";
Object.assign(Datepicker.locales, ru);

window.bootstrap = bootstrap;
window.IMask = IMask;
window.Datepicker = Datepicker;
window.DateRangePicker = DateRangePicker;
