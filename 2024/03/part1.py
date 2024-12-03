import sys
import pathlib
import re
from math import prod

DEFAULT_FILE = pathlib.Path(__file__).parent.resolve().joinpath("input.txt")

REGEX = re.compile(r"mul\((\d{1,3}),(\d{1,3})\)")


def parse() -> list[tuple[int, int]]:
    mults = []
    for line in open(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE, "r"):
        mults.extend([(int(match[0]), int(match[1])) for match in REGEX.findall(line)])
    return mults


def main():
    matches = parse()
    result = sum(map(prod, matches))
    print(result)


if __name__ == "__main__":
    main()
