export function randomName() {
    return Math.random().toString(36).slice(-8);
}
export function randomPrice() {
    return Math.round(Math.random() * 100) / 10;
}
export const random = {
    string: () => randomName(),
    number: () => randomPrice(),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYXBwL3B1YmxpYy9yYW5kb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsTUFBTSxVQUFVLFVBQVU7SUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRCxNQUFNLFVBQVUsV0FBVztJQUN6QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM5QyxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFXO0lBQzVCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUU7SUFDMUIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRTtDQUM1QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBSYW5kb20ge1xuICBzdHJpbmc6ICgpID0+IHN0cmluZztcbiAgbnVtYmVyOiAoKSA9PiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21OYW1lKCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoLTgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tUHJpY2UoKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMDApIC8gMTA7XG59XG5cbmV4cG9ydCBjb25zdCByYW5kb206IFJhbmRvbSA9IHtcbiAgc3RyaW5nOiAoKSA9PiByYW5kb21OYW1lKCksXG4gIG51bWJlcjogKCkgPT4gcmFuZG9tUHJpY2UoKSxcbn07XG4iXX0=