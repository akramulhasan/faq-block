import {
  TextControl,
  TextareaControl,
  Button,
  Icon,
} from "@wordpress/components";
import "./style.scss";

function trackEditorChanges() {
  wp.data.subscribe(function () {
    console.log("hello");
  });
}
trackEditorChanges();

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
    function deleteFaq(indexToDelete) {
      const copyOfFaqsArr = [...props.attributes.faqs];
      const afterDeleteArr = copyOfFaqsArr.filter((faq, index) => {
        return indexToDelete != index;
      });
      props.setAttributes({ faqs: afterDeleteArr });
    }
    //console.log(props.attributes.faqs[0].q);
    return (
      <div className="wpfy-faq-panel">
        {props.attributes.faqs.map((faq, index) => (
          <div className="faq-outer">
            <Button onClick={() => deleteFaq(index)} className="faq-delete">
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
              className="wpfy-faq-input"
              autoFocus={faq.q == undefined}
            />
            <TextareaControl
              value={faq.a}
              onChange={(newValue) => {
                const copyOfFaqsArr = [...props.attributes.faqs];
                copyOfFaqsArr[index].a = newValue;
                props.setAttributes({ faqs: copyOfFaqsArr });
              }}
              label="Answer"
              className="wpfy-faq-input"
            />
          </div>
        ))}
        <Button
          onClick={() => {
            props.setAttributes({
              faqs: props.attributes.faqs.concat([
                { q: undefined, a: undefined },
              ]),
            });
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
