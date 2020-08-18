import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class PowerAuditor implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private iframe: HTMLIFrameElement; // The iframe element to trigger audit event
	private _container: HTMLDivElement;  // The container the component is stored in
	private rendered: boolean; // Whether the iframe is currently rendered

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{	
		// Store the container
		this._container  = container;

		// Check if render is set to true or false
		if (context.parameters.render.raw) {
			// Render the iframe
			this.iframe = document.createElement("iframe");
			
			// Check if a src is given
			if(context.parameters.src.raw) {
				this.iframe.src = context.parameters.src.raw;
			}

			this.iframe.width = "200";
			this.iframe.height ="200";
			this.iframe.frameBorder = "0";

			// Add the iframe to the container
			this._container.appendChild(this.iframe);
			this.rendered = true;
		} else {
			this.rendered = false;
		}
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Check if render is set to true or false
		if (context.parameters.render.raw) {
			// Check that there is not already an iframe render before rendering a new one
			if (this.rendered == false) {
				// Render the iframe
				this.iframe = document.createElement("iframe");

				this.iframe.width = "200";
				this.iframe.height ="200";
				this.iframe.frameBorder = "0";

				// Add the iframe to the container
				this._container.appendChild(this.iframe);
			}

			// Check if a src is given
			if( context.parameters.src.raw) {
				this.iframe.src = context.parameters.src.raw;
			}
			
			this.rendered = true;
		} else {
			// Check if an iframe is currently rendered before removing it
			if (this.rendered == true) {
				this.iframe.remove();
			}

			this.rendered = false;
		}
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}