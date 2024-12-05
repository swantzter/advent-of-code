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


def passes_rule(update: list[int], rule: tuple[int, int]) -> bool:
    return update.index(rule[0]) < update.index(rule[1])


def is_update_valid(update: list[int], rules: list[tuple[int, int]]) -> bool:
    return all(passes_rule(update, rule) for rule in rules)


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
            rule_idx = 0
            while rule_idx < len(match_rules):
                rule = match_rules[rule_idx]
                if passes_rule(update, rule):
                    rule_idx += 1
                else:
                    while not passes_rule(update, rule):
                        # Move the value that has to be last one step later in the rule
                        idx = update.index(rule[1])
                        update[idx], update[idx + 1] = update[idx + 1], update[idx]
                    rule_idx = 0
        valid.append(update)

    print(sum(update[len(update) // 2] for update in valid))


if __name__ == "__main__":
    main()
