
class ColorLookupService {
    lookupColor(index: number): string {
        switch (index) {
            case 0:
                return '#FF01FF';
            case 1:
                return '#00C5FF';
            case 2:
                return '#01FFFF';
            case 3:
                return '#00FF89';
            case 4:
                return '#AEFE00';
            case 5:
                return '#FFD701';
            case 6:
                return '#FDF800';
            case 7:
                return '#FF0100';
            case 8:
                return '#FF4601';
            case 9:
                return '#00DF00';
            case 10:
                return '#69F200';
            case 11:
                return '#FF8600';
            case 12:
                return '#FF5A00';
            case 13:
                return '#00FF01';
            case 14:
                return '#05FB5B';
            case 15:
                return '#A6F164';
            case 16:
                return '#FF0094';
            case 17:
                return '#ffb624';
            case 18:
                return '#E958FF';
            case 19:
                return '#00D3FF';
            case 20:
                return '#B9C9FF';
            case 21:
                return '#8E27DE';
            case 22:
                return '#9917CC';
            case 23:
                return '#C745FE';
            case 24:
                return '#FE4545';

            default:
                return 'var(--color-text)FFF';
        }
    }

    generateRandomAppropriateColor(): string {
        let hue = Math.floor(Math.random() * 360);
        let saturation = Math.floor(Math.random() * 100);
        let lightness = Math.floor(Math.random() * 40);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
}
export default new ColorLookupService();