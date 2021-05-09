import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  input: {
    width: '100%',
  },
  textarea: {
    width: '100%',
  },
  field: {
    position: 'relative'
  },
  error: {
    border: '2px solid red'
  },
  errorText: {
    position: 'absolute',
    top: '0',
    right: '0',
    height: '16px',
    color: 'rgb(255, 0, 0)',
    opacity: '0',
    'font-size': '12px',
    'margin-bottom': '5px',
  },
  errorOn: {
    opacity: '1'
  }
}))

export const Element = (Element) => (props) => {
  const s = useStyles()
  const { input, meta } = props;
  const hasError = meta.touched && meta.error;
  return (
    <>
      <div className={s.field}>
        <Element
          {...props}
          {...input}
          className={`${props.className} ${hasError ? s.error : ""}`}
        />
        {props.type !== "checkbox" ? (
          <div className={`${s.errorText} ${hasError ? s.errorOn : ""}`}>
            {meta.error}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
