"use client";
import React from "react";

const Loading = () => {
  return (
    <div
      id="page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000",
      }}
    >
      <div
        id="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "190px",
            height: "190px",
            border: "1px solid transparent",
            borderRadius: "50%",
            position: "absolute",
            borderBottom: "8px solid rgb(240, 42, 230)",
            animation: "rotate1 2s linear infinite",
          }}
        ></div>

        <div
          style={{
            width: "190px",
            height: "190px",
            border: "1px solid transparent",
            borderRadius: "50%",
            position: "absolute",
            borderBottom: "8px solid rgb(240, 19, 67)",
            animation: "rotate2 2s linear infinite",
          }}
        ></div>

        <div
          style={{
            width: "190px",
            height: "190px",
            border: "1px solid transparent",
            borderRadius: "50%",
            position: "absolute",
            borderBottom: "8px solid rgb(3, 170, 170)",
            animation: "rotate3 2s linear infinite",
          }}
        ></div>

        <div
          style={{
            width: "190px",
            height: "190px",
            border: "1px solid transparent",
            borderRadius: "50%",
            position: "absolute",
            borderBottom: "8px solid rgb(207, 135, 1)",
            animation: "rotate4 2s linear infinite",
          }}
        ></div>

        <div
          style={{
            color: "#fff",
            fontSize: "1.2rem",
            marginTop: "230px",
          }}
        >
          loading
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes rotate1 {
          from {
            transform: rotateX(50deg) rotateZ(110deg);
          }
          to {
            transform: rotateX(50deg) rotateZ(470deg);
          }
        }
        @keyframes rotate2 {
          from {
            transform: rotateX(20deg) rotateY(50deg) rotateZ(20deg);
          }
          to {
            transform: rotateX(20deg) rotateY(50deg) rotateZ(380deg);
          }
        }
        @keyframes rotate3 {
          from {
            transform: rotateX(40deg) rotateY(130deg) rotateZ(450deg);
          }
          to {
            transform: rotateX(40deg) rotateY(130deg) rotateZ(90deg);
          }
        }
        @keyframes rotate4 {
          from {
            transform: rotateX(70deg) rotateZ(270deg);
          }
          to {
            transform: rotateX(70deg) rotateZ(630deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
