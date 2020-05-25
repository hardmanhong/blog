import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import subscript from "markdown-it-sub";
import superscript from "markdown-it-sup";
import footnote from "markdown-it-footnote";
import deflist from "markdown-it-deflist";
import abbreviation from "markdown-it-abbr";
import insert from "markdown-it-ins";
import mark from "markdown-it-mark";
import tasklists from "markdown-it-task-lists";
import toc from "markdown-it-toc-and-anchor";

import api from "@/api/base";
import { upload } from "@/filters";
class MarkdownEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.mdParser = new MarkdownIt()
      .use(subscript)
      .use(superscript)
      .use(footnote)
      .use(deflist)
      .use(abbreviation)
      .use(insert)
      .use(mark)
      // .use(toc, {
      //   html: true,
      //   linkify: true,
      //   typography: true
      // })
      .use(tasklists, { enabled: this.taskLists });
  }
  renderHTML = text => {
    return new Promise(resolve => {
      resolve(this.mdParser.render(text));
    });
  };
  handleImageUpload(file, callback) {
    const reader = new FileReader();
    reader.onload = () => {
      const convertBase64UrlToBlob = urlData => {
        let arr = urlData.split(","),
          mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      };
      const blob = convertBase64UrlToBlob(reader.result);
      const formData = new FormData();
      formData.append("file", blob, file.name);
      api.upload(formData).then(res => {
        callback(upload(res.data));
      });
    };
    reader.readAsDataURL(file);
  }
  render() {
    const { value, onChange } = this.props;
    return (
      <MdEditor
        value={value}
        renderHTML={this.renderHTML}
        onChange={onChange}
        onImageUpload={this.handleImageUpload}
      />
    );
  }
}

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default MarkdownEditor;
