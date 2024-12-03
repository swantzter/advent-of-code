import sys
import pathlib
import re
from math import prod

DEFAULT_FILE = pathlib.Path(__file__).parent.resolve().joinpath("input.txt")

REGEX = re.compile(r"((mul)\((\d{1,3}),(\d{1,3})\)|(do(?:n't)?)\(\))")


def parse() -> list[tuple[int, int]]:
    mults = []
    enabled = True
    for line in open(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE, "r"):
        for match in REGEX.findall(line):
            ins = match[1] if match[1] != "" else match[4]
            match ins:
                case "do":
                    enabled = True
                case "don't":
                    enabled = False
                case _:
                    if enabled:
                        mults.append((int(match[2]), int(match[3])))
    return mults


def main():
    matches = parse()
    result = sum(map(prod, matches))
    print(result)


if __name__ == "__main__":
    main()
