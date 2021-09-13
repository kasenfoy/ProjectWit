class A {
    get(): void
    {
        console.log("Get from A")
    }
}

class B extends A {
    get(): void
    {
        super.get();
        console.log("Get from B");
    }
}

class C extends A {
    static cc()
    {
        const ccc = new C();
    }
}

export { A, B }