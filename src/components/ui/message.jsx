"use client";
import { message } from "antd";
import Swal from "sweetalert2";

export const success = (msg) => {
  message.success(msg);
};

export const info = (msg) => {
  message.info(msg);
};

export const loading = (msg) => {
  message.loading(msg);
};

export const warning = (msg) => {
  message.warning(msg);
};

export const errorMessage = (msg) => {
  message.error(msg);
};

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
