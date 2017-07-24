class Greeter {
    public firstName : string;
    public lastName : string;

    public constructor(firstName : string, lastName : string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public printMe(): string {
        return this.firstName + " : " + this.lastName;
    }
}

// var user = "Jane User";

// document.body.innerHTML = greeter(user);

window.onload = (ev : Event) => {
    var newGreeter = new Greeter("R", "H");

    alert(newGreeter.printMe());
};