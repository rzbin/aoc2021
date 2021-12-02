#include <stdio.h>

int main() {
    char c, direction;
    int amount, x = 0, y = 0, aim = 0;
    while (1) {
        scanf("%c", &c);
        if (c == ' ') {
            break;
        }
        direction = c;
        while (c != ' ') {
            scanf("%c", &c);
        }
        scanf("%d\n", &amount);
        switch (direction) {
            case 'f':
                x += amount;
                y += aim * amount;
                break;
            case 'u':
                aim -= amount;
                break;
            case 'd':
                aim += amount;
                break;
        }
    }
    printf("x: %d y: %d aim: %d\n", x, y, aim);
    printf("%d\n", x * y);
}
