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

export const Services = () => {
  const [activeService, setActiveService] = useState<ServiceKeys | "">("");

  return (
    <div className="services">
      <div className="ui-box services-left">
        <h2>Services</h2>
        <ul>
          {Object.keys(typedServices).map((x: string) => (
            <li key={x} onClick={() => setActiveService(x as ServiceKeys)}>
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="ui-box services-right">
        {activeService && typedServices[activeService] ? (
          <li>
            {typedServices[activeService].map((x: string) => (
              <p>{x}</p>
            ))}
          </li>
        ) : null}
      </div>
    </div>
  );
};
