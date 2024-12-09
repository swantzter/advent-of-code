import sys
import pathlib

DEFAULT_FILE = pathlib.Path(__file__).parent.resolve().joinpath("input.txt")


def parse() -> list[tuple[int, list[int]]]:
    return [
        (int(line.split(":")[0]), list(map(int, line.split(":")[1].split())))
        for line in open(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE, "r")
    ]


def main():
    tests = parse()

    passing: list[int] = []
    for res, terms in tests:
        reductions = [terms.pop(0)]
        while len(terms) > 0:
            term = terms.pop(0)
            new_red = []
            for red in reductions:
                new_red.append(red * term)
                new_red.append(red + term)
            reductions = new_red
        if res in reductions:
            passing.append(res)

    print(sum(passing))


if __name__ == "__main__":
    main()
