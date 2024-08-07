import { useEffect } from "react";
import SecondNav from "../components/SecondNav.jsx";
import GuideNav from "./components/GuideNav.jsx";
import axios from "axios";



export default function GuideIT() {
  useEffect(()=>{
    axios.get("http://i11c201.p.ssafy.io:9999/api/v1/it-knowledge?page=1&size=10").then((response) =>{
      console.log(response.data.response)
    })
  })

  return (
    <>
      <SecondNav />
      <GuideNav />
      <div className="text-center pt-4 px-4">
        <h1 className="py-3 font-semibold text-xl">IT 트렌드</h1>
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
