import React, { useState } from "react";
import ReactDom from "react-dom";
import "./frontend.scss";
import FAQ from "./FAQ";
const targetDivs = document.querySelectorAll(".wpfy-faq-update-me");

targetDivs.forEach((div) => {
  const data = JSON.parse(div.querySelector("pre").innerHTML);
  //console.log(data);
  ReactDom.render(<FAQS data={data} />, div);
});

function FAQS(props) {
  const { faqs } = props.data;
  //console.log(faqs);
  //const [faqs, setFaqs] = useState([faqsArr]);
  return (
    <div className="wpfy-faqs-wrapper">
      {faqs.map((faq, index) => {
        return <FAQ key={index} id={index} faq={faq} />;
      })}
    </div>
  );
}
