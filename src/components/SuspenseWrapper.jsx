import React, { Suspense } from "react";
import styled from "styled-components";

const SuspenseWrapper = ({ children, fallback }) => {
  return (
    <section className="min-h-screen w-screen flex justify-center items-center">
      <Suspense fallback={fallback}>{children}</Suspense>
    </section>
  );
};

export default SuspenseWrapper;
