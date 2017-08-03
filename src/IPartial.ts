/**
 * A class representing a partial HTML page.
 */
interface IPartial {

    /**
     * Instructs this partial to replace the given HTMLElement with its contents.
     */
    render(afterRender?: () => void) : void;
}
