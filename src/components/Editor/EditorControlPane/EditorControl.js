import React from 'react';
import { partial } from 'lodash';
import c from 'classnames';
import { resolveWidget } from 'Lib/registry';
import ControlHOC from './ControlHOC';

export default class EditorControl extends React.Component {
  render() {
    const {
      value,
      field,
      fieldsMetaData,
      fieldsErrors,
      mediaPaths,
      getAsset,
      onChange,
      onOpenMediaLibrary,
      onAddAsset,
      onRemoveInsertedMedia,
      onValidate,
      processControlRef,
    } = this.props;
    const widgetName = field.get('widget');
    const widget = resolveWidget(widgetName);
    const fieldName = field.get('name');
    const metadata = fieldsMetaData && fieldsMetaData.get(fieldName);
    const errors = fieldsErrors && fieldsErrors.get(fieldName);
    return (
      <div className="nc-controlPane-control">
        <ul className="nc-controlPane-errors">
          {
            errors && errors.map(error =>
              error.message &&
              typeof error.message === 'string' &&
              <li key={error.message.trim().replace(/[^a-z0-9]+/gi, '-')}>{error.message}</li>
            )
          }
        </ul>
        <label
          className={c('nc-controlPane-label', { 'nc-controlPane-labelWithError': errors })}
          htmlFor={fieldName}
        >
          {field.get('label')}
        </label>
        <ControlHOC
          controlComponent={widget.control}
          field={field}
          value={value}
          mediaPaths={mediaPaths}
          metadata={metadata}
          onChange={(newValue, newMetadata) => onChange(fieldName, newValue, newMetadata)}
          onValidate={onValidate && partial(onValidate, fieldName)}
          onOpenMediaLibrary={onOpenMediaLibrary}
          onRemoveInsertedMedia={onRemoveInsertedMedia}
          onAddAsset={onAddAsset}
          getAsset={getAsset}
          ref={processControlRef && partial(processControlRef, fieldName)}
        />
      </div>
    );
  }
}
