/**
 * Base class for IPartials that is generated
 */
abstract class PartialDynamicBase implements IPartial {
    public containerElement : HTMLElement;

    public constructor(containerElement: HTMLElement) {
        this.containerElement = containerElement;
    }

    /**
     * Renders the partial to the provided containerElement
     */
    abstract render(afterRender? : () => void) : void;
}