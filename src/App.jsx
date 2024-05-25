import { useEffect, useState, useMemo } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions";
import Select from "react-select";
import { setAnswer } from "./redux/slices /translateSlice";

const App = () => {
  const [text, setText] = useState("");
  const { isLoading, error, languages } = useSelector(
    (store) => store.languageReducer
  );
  const translateState = useSelector((store) => store.translateReducer);

  const [sourceLang, setSourceLang] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  //dil dizisini bizden istenilen formata cevime
  //nesnelerin icerisindeki code ve name degelerini valua ve label degerlerine cevirdik
  //diziyi formatlama islemi her render sirasinda olmasini onlemek icin "useMemo" kullanarak cache'e gonderdik.
  const formatted = useMemo(
    () =>
      languages.map((i) => ({
        label: i.name,
        value: i.code,
      })),
    [languages]
  );
  //api'den ceviri sonucunu alip state'e aktarir.
  const handleTranslate = () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
  };

  const handleSwap = () => {
    //select alanlarindaki verileri yer degistir.
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    //cevap alanindaki veriyi cevir alanina aktar.
    setText(translateState.answer);

    //ceviri alanindaki veriyi cevap alanina aktar.
    dispatch(setAnswer(text));
  };
  return (
    <div className="bg-zinc-900 h-screen text-white grid place-items-center">
      <div className=" w-[80vw] max-w[1100px] flex flex-col justify-center ">
        <h1 className=" items-center text-center text-4xl font-semibold mb-7">
          " "Translate" "
        </h1>
        {/* ust  */}
        <div className="flex gap-2 text-black">
          <Select
            isLoading={isLoading}
            isDisabled={isLoading}
            onChange={(e) => setSourceLang(e)}
            className="flex-1"
            options={formatted}
            value={sourceLang}
          />
          <button
            onClick={handleSwap}
            className="rounded py-2 px-6 bg-slate-500 text-white transition hover:ring-4 hover:bg-slate-600"
          >
            <FaArrowRightArrowLeft />
          </button>
          <Select
            isLoading={isLoading}
            isDisabled={isLoading}
            onChange={(e) => setTargetLang(e)}
            className="flex-1"
            options={formatted}
            value={targetLang}
          />
        </div>
        {/* alt */}
        <div className="flex mt-5 gap-3 md:gap-[105px] max-md:flex-col">
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black"
            ></textarea>
          </div>
          <div className="flex-1 relative">
            <textarea
              value={translateState.answer}
              disabled
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-gray-300"
            ></textarea>

            {translateState.isLoading && (
              <div className="loader absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            )}
          </div>
        </div>

        {/* button */}
        <button
          onClick={handleTranslate}
          className="rounded-md py-3 px-5 text-[17px] font-semibold cursor-pointer bg-slate-600 mt-3 hover:ring-4 hover:bg-slate-800 transition"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default App;
