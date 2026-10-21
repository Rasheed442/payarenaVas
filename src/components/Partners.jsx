import styled from "styled-components";
import tm30 from "../assets/icons/partners/tm30.svg";
import airtel from "../assets/icons/partners/airtel.svg";
import amex from "../assets/icons/partners/amex.svg";
import mastercard from "../assets/icons/partners/mastercard.svg";
import mtn from "../assets/icons/partners/mtn.svg";
import union from "../assets/icons/partners/union.svg";
import visa from "../assets/icons/partners/visa.svg";
import wwtbam from "../assets/icons/partners/wwtbam.svg";

const Partners = () => {
  return (
    <Wrapper>
      <div className="partners">
        {/* <div className="section1">
          <p>Trusted by 20+ companies</p>
        </div> */}
        <div className="marquee">
          <div className="exts">
            <div className="flex1">
              <img src={tm30} alt="" />
              <img src={airtel} alt="" />
              <img src={amex} alt="" />
              <img src={mtn} alt="" />
              <img src={union} alt="" />
              <img src={visa} alt="" />
              {/* <img src={wwtbam} alt="" /> */}
              <img src={mastercard} alt="" />
            </div>
            <div className="flex1">
              <img src={tm30} alt="" />
              <img src={airtel} alt="" />
              <img src={amex} alt="" />
              <img src={mtn} alt="" />
              <img src={union} alt="" />
              <img src={visa} alt="" />
              {/* <img src={wwtbam} alt="" /> */}
              <img src={mastercard} alt="" />
            </div>
            <div className="flex1">
              <img src={tm30} alt="" />
              <img src={airtel} alt="" />
              <img src={amex} alt="" />
              <img src={mtn} alt="" />
              <img src={union} alt="" />
              <img src={visa} alt="" />
              {/* <img src={wwtbam} alt="" /> */}
              <img src={mastercard} alt="" />
            </div>
            <div className="flex1">
              <img src={tm30} alt="" />
              <img src={airtel} alt="" />
              <img src={amex} alt="" />
              <img src={mtn} alt="" />
              <img src={union} alt="" />
              <img src={visa} alt="" />
              {/* <img src={wwtbam} alt="" /> */}
              <img src={mastercard} alt="" />
            </div>
            <div className="flex1">
              <img src={tm30} alt="" />
              <img src={airtel} alt="" />
              <img src={amex} alt="" />
              <img src={mtn} alt="" />
              <img src={union} alt="" />
              <img src={visa} alt="" />
              {/* <img src={wwtbam} alt="" /> */}
              <img src={mastercard} alt="" />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Partners;

const Wrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;

  .partners {
    overflow-x: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background: #f9fafb80; */
    flex-shrink: 1 0 auto;
    padding: 3rem 0rem;
    border-radius: 20px;
    gap: 1rem;
    .section1 {
      padding: 1rem 2rem 1rem 0.5rem;
      color: #7e7e7e;
      p {
        font-family: "cabinet-grotesk-bold";
      }
    }
    .marquee {
      width: 90%;
      overflow-x: hidden;

      .exts {
        width: 420%;
        display: flex;
        align-items: center;
        gap: 8rem;
        justify-content: space-between;
        padding-left: 1rem;
        animation: 60s marquee infinite linear;

        .flex1 {
          display: flex;
          width: 50%;
          align-items: center;
          gap: 5rem;

          img {
            width: 70px;
          }
        }
        &:hover {
          animation-play-state: paused;
        }
      }

      @keyframes marquee {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(-100%);
        }
      }
    }
  }

  @media only screen and (max-width: 450px) {
    padding: 0 1rem;
    top: -2rem;
    .partners {
      padding: 1.5rem 0.3rem;
      border-radius: 10px;

      .section1 {
        padding: 0.3rem 0.2rem 0.3rem 0.5rem;

        p {
          font-size: 0.5rem;
        }
      }
      .marquee {
        .exts {
          gap: 2rem;
          width: 570%;

          .flex1 {
            gap: 2rem;

            img {
              width: 70px;
              height: 20px;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1024px) {
    padding: 0 4rem;
    .partners {
      padding: 2rem 0rem;
    }
  }
  @media only screen and (max-width: 890px) {
    padding: 0 1rem;
    /* top: -2rem; */
    margin-top: 1rem;

    .partners {
      padding: 1.5rem 0.3rem;
      border-radius: 10px;

      .section1 {
        padding: 0.3rem 0.2rem 0.3rem 0.5rem;

        p {
          font-size: 0.5rem;
        }
      }
      .marquee {
        .exts {
          gap: 5rem;
          width: 640%;

          .flex1 {
            gap: 2rem;

            img {
              width: 70px;
              height: 20px;
            }
          }
        }
      }
    }
  }
`;
