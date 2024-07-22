import SecondNav from "../components/SecondNav.jsx";
import GuideNav from "./components/GuideNav.jsx";

export default function GuidePT() {
  return (
    <>
      <SecondNav />
      <GuideNav />
      <div className="text-center pt-4 px-4">
        <h1 className="py-3 font-semibold text-xl">PT 면접 가이드</h1>
        <p className="text-start">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut,
          nostrum. Nesciunt mollitia quidem consequuntur. Perferendis iste in
          fugiat rem nam voluptates, est molestias, voluptas odit, eos quis
          saepe omnis ipsam?
        </p>
      </div>
    </>
  );
}
