const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;

// Register the attribute for blocks
wp.hooks.addFilter(
    'blocks.registerBlockType',
    'view-animation-control/add-animation-attribute',
    (settings, name) => {
        settings.attributes = {
            ...settings.attributes,
            viewAnimationName: {
                type: 'string',
                default: '',
            },
        };
        return settings;
    }
);

const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
    console.log('withInspectorControls running');
    return (props) => {
        const { attributes, setAttributes } = props;
        const { viewAnimationName } = attributes;

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title="View Animation" initialOpen={false}>
                        <TextControl
                            label="View Animation Name"
                            value={viewAnimationName}
                            help="Enter the animation name for this block."
                            onChange={(value) => {
                                setAttributes({ viewAnimationName: value });
                            }}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, "withInspectorControls");

wp.hooks.addFilter(
    "editor.BlockEdit",
    "view-animation-control/with-inspector-controls",
    withInspectorControls
);
