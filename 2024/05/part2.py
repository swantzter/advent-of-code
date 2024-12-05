import sys
import pathlib
from functools import cmp_to_key

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


def create_key_fn(rules: list[tuple[int, int]]):
    def comparator(a: int, b: int) -> int:
        rule = next((rule for rule in rules if (a, b) == rule), None)
        if rule:
            if a < rule[1]:
                return 1
            if a > rule[1]:
                return -1
        return 0

    return cmp_to_key(comparator)


def is_update_valid(update: list[int], rules: list[tuple[int, int]]) -> bool:
    return all(map(lambda rule: update.index(rule[0]) < update.index(rule[1]), rules))


def main():
    [rules, updates] = parse()
    valid: list[list[int]] = []

    for update in updates:
        match_rules = [rule for rule in rules if all(page in update for page in rule)]
        update_valid = is_update_valid(update, match_rules)

        # Only take rules that was invalid into account
        if update_valid:
            continue

        while not is_update_valid(update, match_rules):
            update.sort(key=create_key_fn(match_rules))
        valid.append(update)

    print(sum(update[len(update) // 2] for update in valid))


if __name__ == "__main__":
    main()
