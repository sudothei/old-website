import * as React from "react";
import { AnimatedPfp } from "./components/AnimatedPfp";
import { SocialButtons } from "./components/SocialButtons";
import { useState } from "react";
import { Modal } from "./components/Modal";
import services from "components/services.json";

interface Services {
  "Web Design and Development": string[];
  "Mobile App Development": string[];
  "Technical Support and IT Services": string[];
  "Custom Router Upgrade": string[];
  "Other Services": string[];
}

const typedServices: Services = services as Services;

type ServiceKeys = keyof Services;

export const ActualHome = () => {
  const [activeService, setActiveService] = useState<ServiceKeys | "">("");
  const selectService = (service: ServiceKeys | "") => {
    setActiveService(service);
    setModalOpen(true);
    document.querySelector("#modal")!.className = "flyin-modal";
    document.querySelector("#home")!.classList.add("flyout");
    document.querySelector("#home")!.classList.remove("flyin");
  };
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    document.querySelector("#modal")!.className = "flyout-modal";
    document.querySelector("#home")!.classList.add("flyin");
    document.querySelector("#home")!.classList.remove("flyout");
  };

  return (
    <div className="container">
      <Modal
        style={{
          visibility: modalOpen ? "visible" : "hidden",
        }}
        setModalOpen={setModalOpen}
        closeModal={closeModal}
        header={activeService}
        content={
          <ul>
            {activeService &&
              typedServices[activeService].map((x: string, index: number) => (
                <p key={index}>{x}</p>
              ))}
          </ul>
        }
      />
      <div
        id="home"
        style={{
          display: "flex",
          flexWrap: "wrap-reverse",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="ui-box">
          <AnimatedPfp />
        </div>
        <div className="ui-box">
          <h2>Services</h2>
          <ul>
            {Object.keys(typedServices).map((x: string) => (
              <li key={x} onClick={() => selectService(x as ServiceKeys)}>
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="ui-box">
          <SocialButtons />
        </div>
      </div>
    </div>
  );
};
