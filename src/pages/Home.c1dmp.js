import { Products } from "public/API";
import { random } from "public/random";
export const startingPage = { limit: 10, offset: 0 };
export var State;
(function (State) {
    State["LOADING"] = "Loading";
    State["EMPTY"] = "Empty";
    State["LIST"] = "List";
})(State || (State = {}));
export const App = ($, random) => {
    let cursor = { ...startingPage };
    let cache = [];
    const appState = $("#appState");
    const repeater = $("#products");
    const addMore = $("#addMore");
    const loadMore = $("#loadMore");
    appState.changeState(State.LOADING);
    repeater.data = [];
    const loadPage = async (page) => {
        if (repeater.data.length === 0 || page === startingPage) {
            appState.changeState(State.LOADING);
        }
        const products = await Products.getProducts({ field: "_createdDate", order: "desc" }, page);
        cache =
            page == startingPage ? products.items : [...products.items, ...cache];
        repeater.data = cache;
        if (repeater.data.length === 0) {
            appState.changeState(State.EMPTY);
        }
        else {
            appState.changeState(State.LIST);
        }
        cursor = products.cursor;
        products.cursor ? loadMore.enable() : loadMore.disable();
    };
    loadMore.onClick(async () => cursor && (await loadPage(cursor)));
    addMore.onClick(async () => {
        const newProduct = {
            title: random.string(),
            price: random.number(),
        };
        await Products.addProduct(newProduct.title, newProduct.price);
        await loadPage(startingPage);
    });
    repeater.onItemReady(($item, itemData) => {
        $item("#productName").text = itemData.title;
        $item("#productPrice").text = itemData.price.toFixed(2);
        $item("#productCreated").text = itemData._createdDate.toDateString();
        $item("#delete").onClick(async () => {
            await Products.deleteProduct(itemData._id);
            await loadPage(startingPage);
        });
    });
    return () => loadPage(startingPage);
};
$w.onReady(() => {
    App($w, random)();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSE9NRS5jMWRtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9wYWdlcy9IT01FLmMxZG1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFdEMsT0FBTyxFQUFFLE1BQU0sRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUUvQyxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUVyRCxNQUFNLENBQU4sSUFBWSxLQUlYO0FBSkQsV0FBWSxLQUFLO0lBQ2YsNEJBQW1CLENBQUE7SUFDbkIsd0JBQWUsQ0FBQTtJQUNmLHNCQUFhLENBQUE7QUFDZixDQUFDLEVBSlcsS0FBSyxLQUFMLEtBQUssUUFJaEI7QUFDRCxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFZLEVBQUUsTUFBYyxFQUFFLEVBQUU7SUFDbEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxHQUFHLFlBQVksRUFBRSxDQUFDO0lBQ2pDLElBQUksS0FBSyxHQUFjLEVBQUUsQ0FBQztJQUUxQixNQUFNLFFBQVEsR0FBcUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sUUFBUSxHQUFnQixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0MsTUFBTSxPQUFPLEdBQWMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sUUFBUSxHQUFjLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUUzQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwQyxRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUVuQixNQUFNLFFBQVEsR0FBRyxLQUFLLEVBQUUsSUFBWSxFQUFFLEVBQUU7UUFDdEMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLFlBQVksRUFBRTtZQUN2RCxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyQztRQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sUUFBUSxDQUFDLFdBQVcsQ0FDekMsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFDeEMsSUFBSSxDQUNMLENBQUM7UUFDRixLQUFLO1lBQ0gsSUFBSSxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUV4RSxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUV0QixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM5QixRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7UUFFRCxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUN6QixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzRCxDQUFDLENBQUM7SUFFRixRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpFLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDekIsTUFBTSxVQUFVLEdBQUc7WUFDakIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDdEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUU7U0FDdkIsQ0FBQztRQUNGLE1BQU0sUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU5RCxNQUFNLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFZLEVBQUUsUUFBaUIsRUFBRSxFQUFFO1FBQ3ZELEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUM1QyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hELEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXJFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDbEMsTUFBTSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQyxNQUFNLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBRUYsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7SUFDZCxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9kdWN0cyB9IGZyb20gXCJwdWJsaWMvQVBJXCI7XG5pbXBvcnQgeyBDdXJzb3IsIFByb2R1Y3QgfSBmcm9tIFwiYmFja2VuZC9zdG9yZXMvUHJvZHVjdHNcIjtcbmltcG9ydCB7IHJhbmRvbSwgUmFuZG9tIH0gZnJvbSBcInB1YmxpYy9yYW5kb21cIjtcblxuZXhwb3J0IGNvbnN0IHN0YXJ0aW5nUGFnZSA9IHsgbGltaXQ6IDEwLCBvZmZzZXQ6IDAgfTtcblxuZXhwb3J0IGVudW0gU3RhdGUge1xuICBMT0FESU5HID0gXCJMb2FkaW5nXCIsXG4gIEVNUFRZID0gXCJFbXB0eVwiLFxuICBMSVNUID0gXCJMaXN0XCIsXG59XG5leHBvcnQgY29uc3QgQXBwID0gKCQ6IHR5cGVvZiAkdywgcmFuZG9tOiBSYW5kb20pID0+IHtcbiAgbGV0IGN1cnNvciA9IHsgLi4uc3RhcnRpbmdQYWdlIH07XG4gIGxldCBjYWNoZTogUHJvZHVjdFtdID0gW107XG5cbiAgY29uc3QgYXBwU3RhdGU6ICR3Lk11bHRpU3RhdGVCb3ggPSAkKFwiI2FwcFN0YXRlXCIpO1xuICBjb25zdCByZXBlYXRlcjogJHcuUmVwZWF0ZXIgPSAkKFwiI3Byb2R1Y3RzXCIpO1xuICBjb25zdCBhZGRNb3JlOiAkdy5CdXR0b24gPSAkKFwiI2FkZE1vcmVcIik7XG4gIGNvbnN0IGxvYWRNb3JlOiAkdy5CdXR0b24gPSAkKFwiI2xvYWRNb3JlXCIpO1xuXG4gIGFwcFN0YXRlLmNoYW5nZVN0YXRlKFN0YXRlLkxPQURJTkcpO1xuICByZXBlYXRlci5kYXRhID0gW107XG5cbiAgY29uc3QgbG9hZFBhZ2UgPSBhc3luYyAocGFnZTogQ3Vyc29yKSA9PiB7XG4gICAgaWYgKHJlcGVhdGVyLmRhdGEubGVuZ3RoID09PSAwIHx8IHBhZ2UgPT09IHN0YXJ0aW5nUGFnZSkge1xuICAgICAgYXBwU3RhdGUuY2hhbmdlU3RhdGUoU3RhdGUuTE9BRElORyk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvZHVjdHMgPSBhd2FpdCBQcm9kdWN0cy5nZXRQcm9kdWN0cyhcbiAgICAgIHsgZmllbGQ6IFwiX2NyZWF0ZWREYXRlXCIsIG9yZGVyOiBcImRlc2NcIiB9LFxuICAgICAgcGFnZVxuICAgICk7XG4gICAgY2FjaGUgPVxuICAgICAgcGFnZSA9PSBzdGFydGluZ1BhZ2UgPyBwcm9kdWN0cy5pdGVtcyA6IFsuLi5wcm9kdWN0cy5pdGVtcywgLi4uY2FjaGVdO1xuXG4gICAgcmVwZWF0ZXIuZGF0YSA9IGNhY2hlO1xuXG4gICAgaWYgKHJlcGVhdGVyLmRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICBhcHBTdGF0ZS5jaGFuZ2VTdGF0ZShTdGF0ZS5FTVBUWSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcFN0YXRlLmNoYW5nZVN0YXRlKFN0YXRlLkxJU1QpO1xuICAgIH1cblxuICAgIGN1cnNvciA9IHByb2R1Y3RzLmN1cnNvcjtcbiAgICBwcm9kdWN0cy5jdXJzb3IgPyBsb2FkTW9yZS5lbmFibGUoKSA6IGxvYWRNb3JlLmRpc2FibGUoKTtcbiAgfTtcblxuICBsb2FkTW9yZS5vbkNsaWNrKGFzeW5jICgpID0+IGN1cnNvciAmJiAoYXdhaXQgbG9hZFBhZ2UoY3Vyc29yKSkpO1xuXG4gIGFkZE1vcmUub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgbmV3UHJvZHVjdCA9IHtcbiAgICAgIHRpdGxlOiByYW5kb20uc3RyaW5nKCksXG4gICAgICBwcmljZTogcmFuZG9tLm51bWJlcigpLFxuICAgIH07XG4gICAgYXdhaXQgUHJvZHVjdHMuYWRkUHJvZHVjdChuZXdQcm9kdWN0LnRpdGxlLCBuZXdQcm9kdWN0LnByaWNlKTtcblxuICAgIGF3YWl0IGxvYWRQYWdlKHN0YXJ0aW5nUGFnZSk7XG4gIH0pO1xuXG4gIHJlcGVhdGVyLm9uSXRlbVJlYWR5KCgkaXRlbTogJHcuJHcsIGl0ZW1EYXRhOiBQcm9kdWN0KSA9PiB7XG4gICAgJGl0ZW0oXCIjcHJvZHVjdE5hbWVcIikudGV4dCA9IGl0ZW1EYXRhLnRpdGxlO1xuICAgICRpdGVtKFwiI3Byb2R1Y3RQcmljZVwiKS50ZXh0ID0gaXRlbURhdGEucHJpY2UudG9GaXhlZCgyKTtcbiAgICAkaXRlbShcIiNwcm9kdWN0Q3JlYXRlZFwiKS50ZXh0ID0gaXRlbURhdGEuX2NyZWF0ZWREYXRlLnRvRGF0ZVN0cmluZygpO1xuXG4gICAgJGl0ZW0oXCIjZGVsZXRlXCIpLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgUHJvZHVjdHMuZGVsZXRlUHJvZHVjdChpdGVtRGF0YS5faWQpO1xuICAgICAgYXdhaXQgbG9hZFBhZ2Uoc3RhcnRpbmdQYWdlKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuICgpID0+IGxvYWRQYWdlKHN0YXJ0aW5nUGFnZSk7XG59O1xuXG4kdy5vblJlYWR5KCgpID0+IHtcbiAgQXBwKCR3LCByYW5kb20pKCk7XG59KTtcbiJdfQ==