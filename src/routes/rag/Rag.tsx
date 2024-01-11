import * as React from "react";
import { useRef } from "react";
import { SicpWizard } from "components/SicpWizard";
import { LoadingBar } from "components/LoadingBar";

const RagInput = () => {
  let ragInput = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    if (typeof ragInput != null) {
      ragInput.current!.style.height = "auto";
      ragInput.current!.style.height = ragInput.current!.scrollHeight + "px";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        margin: "1em",
        marginTop: "1em",
        border: "3px solid #0f0",
        flexFlow: "wrap",
      }}
    >
      <div
        style={{
          width: "100%",
          marginBottom: "0",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "100%",
            fontWeight: 900,
            overflowY: "scroll",
            maxHeight: "50vh",
            display: "flex",
          }}
        >
          <span
            style={{
              alignSelf: "center",
              paddingLeft: "0.5em",
              paddingRight: "0.5em",
            }}
          >
            &gt;
          </span>
          <textarea
            ref={ragInput}
            onChange={autoResize}
            rows={1}
            style={{
              background: "transparent",
              color: "#0f0",
              width: "100%",
              border: "none",
              fontSize: "1.2em",
              fontWeight: 900,
              height: 21,
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div
      className="container"
      style={{
        height: "calc(100vh - 4em)",
        paddingBottom: 0,
      }}
    >
      <div
        style={{
          width: "calc(100vw - 6em)",
          border: "none",
          display: "flex",
          flex: "1 1 auto",
          maxHeight: "calc(100vh - 6em)",
          flexDirection: "column",
        }}
      >
        <SicpWizard />
        <div
          style={{
            display: "flex",
            width: "100%",
            flex: "1 1 auto",
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              margin: "0 1em",
              border: "3px solid #0f0",
              width: "100%",
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                flexDirection: "column",
                justifyContent: "flex-end",
                textAlign: "left",
                paddingTop: 60,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
              non blandit massa enim nec dui nunc mattis. Fames ac turpis
              egestas sed. Massa placerat duis ultricies lacus. In ornare quam
              viverra orci sagittis eu volutpat odio facilisis. Egestas integer
              eget aliquet nibh praesent tristique. Vitae aliquet nec
              ullamcorper sit. Curabitur gravida arcu ac tortor dignissim
              convallis aenean. Eu augue ut lectus arcu bibendum at. Quam
              pellentesque nec nam aliquam. Nulla pellentesque dignissim enim
              sit amet venenatis urna cursus. Pellentesque pulvinar pellentesque
              habitant morbi tristique senectus et. Ultrices in iaculis nunc sed
              augue. Morbi tincidunt ornare massa eget egestas purus viverra.
              Felis bibendum ut tristique et egestas quis ipsum suspendisse
              ultrices. Arcu dui vivamus arcu felis bibendum ut tristique et.
              Enim neque volutpat ac tincidunt vitae semper quis lectus. Odio
              facilisis mauris sit amet. Congue eu consequat ac felis. Potenti
              nullam ac tortor vitae purus. Sed felis eget velit aliquet. Massa
              ultricies mi quis hendrerit dolor magna eget est lorem. Dolor sit
              amet consectetur adipiscing elit pellentesque habitant morbi
              tristique. In hac habitasse platea dictumst quisque sagittis
              purus. Donec ultrices tincidunt arcu non sodales neque. Rhoncus
              urna neque viverra justo. Dignissim cras tincidunt lobortis
              feugiat vivamus at augue eget. Erat pellentesque adipiscing
              commodo elit at. Mi ipsum faucibus vitae aliquet. In aliquam sem
              fringilla ut morbi tincidunt. Ac felis donec et odio pellentesque.
              Ullamcorper malesuada proin libero nunc consequat interdum. Mi
              bibendum neque egestas congue. Quis lectus nulla at volutpat diam
              ut venenatis. Tempor commodo ullamcorper a lacus vestibulum sed
              arcu non. Elit eget gravida cum sociis. Arcu non sodales neque
              sodales ut etiam sit amet. Diam quis enim lobortis scelerisque
              fermentum dui faucibus. Feugiat nisl pretium fusce id velit ut
              tortor pretium viverra. Sem nulla pharetra diam sit. Dictumst
              vestibulum rhoncus est pellentesque elit ullamcorper dignissim
              cras. Id faucibus nisl tincidunt eget nullam non nisi est. Id
              volutpat lacus laoreet non curabitur gravida arcu ac. Non pulvinar
              neque laoreet suspendisse interdum. Leo in vitae turpis massa.
              Porttitor leo a diam sollicitudin tempor id eu nisl. Adipiscing
              tristique risus nec feugiat in fermentum. Hac habitasse platea
              dictumst vestibulum rhoncus est pellentesque. Nisl nunc mi ipsum
              faucibus vitae aliquet nec. Feugiat in ante metus dictum at
              tempor. Ornare arcu dui vivamus arcu felis bibendum. Lorem ipsum
              dolor sit amet. Dolor sed viverra ipsum nunc aliquet bibendum
              enim. Volutpat diam ut venenatis tellus in metus vulputate eu.
              Imperdiet sed euismod nisi porta lorem mollis aliquam. Nisl nunc
              mi ipsum faucibus. Sed risus pretium quam vulputate dignissim. Id
              venenatis a condimentum vitae sapien. Mi ipsum faucibus vitae
              aliquet. Nulla facilisi etiam dignissim diam quis enim. Ultrices
              vitae auctor eu augue ut lectus arcu bibendum. Elementum nisi quis
              eleifend quam adipiscing vitae. Semper risus in hendrerit gravida.
              Nisl pretium fusce id velit ut tortor pretium viverra suspendisse.
              Aliquam id diam maecenas ultricies mi eget. Sodales ut etiam sit
              amet nisl purus in mollis nunc. Urna molestie at elementum eu
              facilisis sed odio morbi quis. Ut tellus elementum sagittis vitae
              et leo duis. Vitae aliquet nec ullamcorper sit amet risus nullam
              eget. Egestas pretium aenean pharetra magna ac placerat vestibulum
              lectus mauris. Feugiat vivamus at augue eget arcu dictum. Tellus
              in hac habitasse platea dictumst vestibulum rhoncus est
              pellentesque. Ullamcorper dignissim cras tincidunt lobortis
              feugiat vivamus at augue eget. Fusce ut placerat orci nulla
              pellentesque dignissim enim. Sollicitudin ac orci phasellus
              egestas tellus rutrum tellus pellentesque eu. Blandit libero
              volutpat sed cras ornare arcu dui vivamus arcu. Ut sem viverra
              aliquet eget sit. Risus nec feugiat in fermentum posuere. Interdum
              consectetur libero id faucibus nisl tincidunt eget. Augue interdum
              velit euismod in pellentesque massa placerat duis ultricies.
              Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel.
              Sit amet consectetur adipiscing elit pellentesque habitant morbi.
              Et netus et malesuada fames. Lacus sed turpis tincidunt id aliquet
              risus. Varius morbi enim nunc faucibus a. Odio eu feugiat pretium
              nibh ipsum consequat. Dolor morbi non arcu risus quis varius quam
              quisque. Aliquet lectus proin nibh nisl condimentum id venenatis.
              Amet consectetur adipiscing elit duis tristique sollicitudin.
              Magna fermentum iaculis eu non diam phasellus vestibulum.
              Ridiculus mus mauris vitae ultricies leo integer. At quis risus
              sed vulputate. Blandit libero volutpat sed cras ornare arcu.
              Mattis rhoncus urna neque viverra justo nec ultrices dui. Rutrum
              quisque non tellus orci ac auctor augue mauris. Quis ipsum
              suspendisse ultrices gravida dictum fusce ut placerat orci.
              Pharetra pharetra massa massa ultricies mi quis hendrerit dolor.
              Non quam lacus suspendisse faucibus interdum. Maecenas ultricies
              mi eget mauris pharetra. Netus et malesuada fames ac turpis
              egestas integer eget aliquet. Sit amet luctus venenatis lectus.
              Dictumst quisque sagittis purus sit amet volutpat consequat
              mauris. Ut porttitor leo a diam sollicitudin tempor id eu nisl.
              Enim nec dui nunc mattis enim ut. Sit amet consectetur adipiscing
              elit pellentesque habitant. Viverra ipsum nunc aliquet bibendum
              enim facilisis. Et malesuada fames ac turpis egestas maecenas.
              Fermentum posuere urna nec tincidunt praesent semper feugiat.
              Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet.
              Ullamcorper eget nulla facilisi etiam dignissim diam. Rhoncus
              aenean vel elit scelerisque mauris pellentesque pulvinar. Varius
              quam quisque id diam vel quam elementum pulvinar. Natoque
              penatibus et magnis dis parturient. Sed ullamcorper morbi
              tincidunt ornare massa eget egestas purus. Velit laoreet id donec
              ultrices tincidunt. Et odio pellentesque diam volutpat commodo sed
              egestas egestas fringilla. Leo a diam sollicitudin tempor id eu
              nisl. Hendrerit dolor magna eget est. Urna duis convallis
              convallis tellus id interdum velit laoreet. Fusce id velit ut
              tortor pretium viverra suspendisse. Bibendum est ultricies integer
              quis auctor elit sed. Mauris rhoncus aenean vel elit. Sagittis
              purus sit amet volutpat. Convallis convallis tellus id interdum
              velit laoreet id donec. Condimentum vitae sapien pellentesque
              habitant morbi tristique senectus et.
            </div>
          </div>
        </div>
        <RagInput />
      </div>
    </div>
  );
};

export const Rag = () => {
  return (
    <div className="App">
      <LoadingBar />
      <App />
      <div className="border-corners"></div>
      <div className="border-edges"></div>
    </div>
  );
};
