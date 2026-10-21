import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { CountUp } from "use-count-up";

const PowerOfPayarena = () => {
  const myRef = useRef();
  const [elementIsVisible, setElementIsVisible] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setElementIsVisible(entry.isIntersecting);
    });
    if (elementIsVisible) {
      setIsCounting(true);
    } else {
      setIsCounting(false);
    }
    observer.observe(myRef.current);
  }, [elementIsVisible]);

  return (
    <Container>
      <h2>Unleash the full power of Payarena</h2>
      <p>
        Everything you need in one platform,<br /> <span>Pay</span>,
        <span> Shop</span>, and <span>Verify</span>.
      </p>
      <div className="numbersContainer" ref={myRef}>
        <div className="child child1">
          <h1>
            <CountUp
              isCounting={isCounting}
              onComplete={() => {
                if (elementIsVisible) {
                  return { shouldRepeat: true, delay: 5 };
                }
              }}
              end={200}
              duration={3}
            />
            K+
          </h1>
          <p>Transactions</p>
        </div>
        <div className="child child2">
          <h1>
            {" "}
            <CountUp
              isCounting={isCounting}
              onComplete={() => {
                if (elementIsVisible) {
                  return { shouldRepeat: true, delay: 5 };
                }
              }}
              end={500}
              duration={3}
            />
            +
          </h1>
          <p>Integrations with billers</p>
        </div>
        <div className="child child3">
          <h1>
            {" "}
            <CountUp
              isCounting={isCounting}
              onComplete={() => {
                if (elementIsVisible) {
                  return { shouldRepeat: true, delay: 5 };
                }
              }}
              end={600}
              duration={3}
            />
            %
          </h1>
          <p>Faster Transaction Time</p>
        </div>
      </div>
    </Container>
  );
};

export default PowerOfPayarena;

const Container = styled.section`
  margin: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h2 {
    font-family: "Roboto-Bold", sans-serif;
    color: #101828;
    font-size: 2.5rem;
    margin: 1rem 0;
  }
  p {
    font-family: "GeneralSans-Light";
    color: #000000;
    font-size: 16px;
    text-align: center;

    span {
      font-weight: bold;
      font-family: "GeneralSans-Bold";
    }
  }

  .numbersContainer {
    margin-top: 4rem;
    display: flex;

    .child {
      padding: 0.3rem 2rem;
      h1,
      p {
        text-align: center;
      }
      h1 {
        font-size: 3rem;
        font-family: "Roboto-Bold", sans-serif;
        color: #24b0ff;
        span {
          font-size: 40px;
        }
      }
      p {
        margin-top: 0.1rem;
        font-family: "GeneralSans-Regular", sans-serif;
        font-size: 13px;
        color: #000;
      }
    }
    .child1 {
      border-right: 1px solid #eaecf0;
    }
    .child3 {
      border-left: 1px solid #eaecf0;
    }
  }

  @media only screen and (max-width: 900px) {
    .arrow5 {
      position: absolute;
      left: 0;
      bottom: 5px;
      height: 80px;
      width: 100px;
    }
  }
  @media only screen and (max-width: 700px) {
    .arrow5 {
      display: none;
    }
    .numbersContainer {
      .child {
        padding: 0.3rem 1.5rem;
      }
    }
  }
  @media screen and (max-width: 480px) {
    margin: 5rem 0 3rem;

    h2 {
      font-size: 1.2rem;
    }
    p {
      font-size: 12px;
    }
    .numbersContainer {
      .child {
        padding: 0.3rem 1rem;
        h1,
        h1 {
          font-size: 1.4rem;
          font-family: "Roboto-Bold", sans-serif;
          color: #24b0ff;
          span {
            font-size: 10px;
          }
        }
        p {
          margin-top: 0.1rem;
          font-family: "GeneralSans-Regular", sans-serif;
          font-size: 11px;
          color: #000;
        }
      }
    }
  }
`;
