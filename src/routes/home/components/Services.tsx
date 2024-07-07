import * as React from "react";
import { useState } from "react";
import services from "components/services.json";

interface Services {
  "Web Design and Development": string[];
  "Mobile App Development": string[];
  "Technical Support and IT Services": string[];
  "Custom Router Upgrade": string[];
  "Other Services": string[];
}

type ServiceKeys = keyof Services;

const typedServices: Services = services as Services;

export const Services = ({ ...props }) => {
  const [activeService, setActiveService] = useState<ServiceKeys | "">("");

  const selectService = (service: any) => {
    setActiveService(service);
    props.openModal();
  };

  return (
    <div className="ui-box">
      {
        <div>
          <div>
            <h2>Services</h2>
            <ul>
              {Object.keys(typedServices).map((x: string) => (
                <li key={x} onClick={() => selectService(x as ServiceKeys)}>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {activeService && typedServices[activeService] ? (
              <li>
                {typedServices[activeService].map((x: string) => (
                  <p>{x}</p>
                ))}
              </li>
            ) : null}
          </div>
        </div>
      }
    </div>
  );
};
