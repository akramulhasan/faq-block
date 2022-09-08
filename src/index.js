import {
  TextControl,
  TextareaControl,
  Button,
  Icon,
} from "@wordpress/components";
import "./style.scss";

function trackEditorChanges() {
  let locked = false;
  wp.data.subscribe(function () {
    function isUndefined(faqs) {
      return faqs.some(function (faq) {
        return faq.q == undefined || faq.a == undefined;
      });
    }

    const results = wp.data
      .select("core/block-editor")
      .getBlocks()
      .filter(function (block) {
        return (
          block.name == "wpfyfaq/wpfy-faq-block" &&
          isUndefined(block.attributes.faqs)
        );
      });

    if (results.length && locked == false) {
      locked = true;
      wp.data.dispatch("core/editor").lockPostSaving("no-faq-data");
    }
    if (!results.length && locked) {
      locked = false;
      wp.data.dispatch("core/editor").unlockPostSaving("no-faq-data");
    }
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
      default: [{ q: undefined, a: undefined }],
    },
  },
  edit: function (props) {
    //Method to update question event
    function updateQuestion(newValue, indexToUpdate) {
      //Check if input has something
      if (newValue.length) {
        //Update atts quesiton with new value
        const copyOfFaqsArr = [...props.attributes.faqs];
        copyOfFaqsArr[indexToUpdate].q = newValue;
        props.setAttributes({ faqs: copyOfFaqsArr });
      } else {
        // set atts question value to undefined
        const copyOfFaqsArr = [...props.attributes.faqs];
        copyOfFaqsArr[indexToUpdate].q = undefined;
        props.setAttributes({ faqs: copyOfFaqsArr });
      }
    }

    //Method to update answer event
    function updateAnswer(newValue, indexToUpdate) {
      //Update atts answer with new value
      if (newValue.length) {
        const copyOfFaqsArr = [...props.attributes.faqs];
        copyOfFaqsArr[indexToUpdate].a = newValue;
        props.setAttributes({ faqs: copyOfFaqsArr });
      } else {
        // Set atts answer value to undefined
        const copyOfFaqsArr = [...props.attributes.faqs];
        copyOfFaqsArr[indexToUpdate].a = undefined;
        props.setAttributes({ faqs: copyOfFaqsArr });
      }
    }
    function deleteFaq(indexToDelete) {
      const copyOfFaqsArr = [...props.attributes.faqs];
      const afterDeleteArr = copyOfFaqsArr.filter((faq, index) => {
        return indexToDelete != index;
      });
      props.setAttributes({ faqs: afterDeleteArr });
    }
    return (
      <div className="wpfy-faq-panel">
        {props.attributes.faqs.map((faq, index) => (
          <div className="faq-outer">
            <Button onClick={() => deleteFaq(index)} className="faq-delete">
              <Icon icon="trash" />
            </Button>
            <TextControl
              value={faq.q}
              // onChange={(newValue) => {}
              onChange={(newValue) => updateQuestion(newValue, index)}
              label="Question"
              className="wpfy-faq-input"
              autoFocus={faq.q == undefined}
            />
            <TextareaControl
              value={faq.a}
              onChange={(newValue) => updateAnswer(newValue, index)}
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
