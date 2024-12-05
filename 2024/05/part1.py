import sys
import pathlib

DEFAULT_FILE = pathlib.Path(__file__).parent.resolve().joinpath("input.txt")


def parse() -> tuple[list[tuple[int, int]], list[list[int]]]:
    rules: list[tuple[int, int]] = []
    updates: list[list[int]] = []

    for line in open(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE, "r"):
        match line:
            case line if "|" in line:
                rules.append(tuple(map(int, line.split("|"))))
            case line if "," in line:
                updates.append(list(map(int, line.split(","))))

    return (rules, updates)


def main():
    [rules, updates] = parse()
    valid: list[list[int]] = []

    for update in updates:
        match_rules = [rule for rule in rules if all(page in update for page in rule)]
        update_valid = all(
            map(lambda rule: update.index(rule[0]) < update.index(rule[1]), match_rules)
        )
        if update_valid:
            valid.append(update)

    print(sum(update[len(update) // 2] for update in valid))


if __name__ == "__main__":
    main()
