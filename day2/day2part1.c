#include <stdio.h>

int main() {
    char c, direction;
    int amount, x = 0, y = 0;
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
                break;
            case 'u':
                y -= amount;
                break;
            case 'd':
                y += amount;
                break;
        }
    }
    printf("%d %d\n", x, y);
    printf("%d\n", x * y);
}
