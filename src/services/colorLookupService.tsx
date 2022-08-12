
class ColorLookupService {
    generateRandomAppropriateColor(): string {
        let hue = Math.floor(Math.random() * 360);
        let saturation = Math.floor(Math.random() * 100);
        let lightness = Math.floor(Math.random() * 40);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
}
export default new ColorLookupService();