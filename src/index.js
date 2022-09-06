import {
  TextControl,
  TextareaControl,
  Button,
  Icon,
} from "@wordpress/components";
import "./style.scss";
wp.blocks.registerBlockType("wpfyfaq/wpfy-faq-block", {
  title: "WPFY FAQ Block",
  icon: "align-wide",
  category: "common",
  attributes: {
    faqs: {
      type: "array",
      default: [{}],
    },
  },
  edit: function (props) {
    function updateQuestion(value) {
      props.setAttributes({ question: value });
    }
    function updateAnswer(value) {
      props.setAttributes({ answer: value });
    }
    //console.log(props.attributes.faqs[0].q);
    return (
      <div className="wpfy-faq-panel">
        {props.attributes.faqs.map((faq, index) => (
          <div className="faq-outer">
            <Button className="faq-delete">
              <Icon icon="trash" />
            </Button>
            <TextControl
              value={faq.q}
              onChange={(newValue) => {
                const copyOfFaqsArr = [...props.attributes.faqs];
                copyOfFaqsArr[index].q = newValue;
                props.setAttributes({ faqs: copyOfFaqsArr });
              }}
              label="Question"
            />
            <TextareaControl
              value={faq.a}
              onChange={(newValue) => {
                const copyOfFaqsArr = [...props.attributes.faqs];
                copyOfFaqsArr[index].a = newValue;
                props.setAttributes({ faqs: copyOfFaqsArr });
              }}
              label="Answer"
            />
          </div>
        ))}
        <Button
          onClick={() => {
            props.setAttributes({ faqs: props.attributes.faqs.concat([{}]) });
          }}
          variant="primary"
        >
          + Add FAQ
        </Button>
      </div>
    );
  },
  save: function (props) {
    return null;
  },
});
