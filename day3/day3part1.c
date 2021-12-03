#include <stdio.h>
#include <stdlib.h>

#define N 12

int main() {
    char c;
    int running = 1;
    int *count = calloc(N, sizeof(int));
    int total = 0;
    while (running) {
        int i = 0;
        while (running) {
            if (scanf("%c", &c) == EOF) {
                running = 0;
                break;
            }
            if (c == '\n') {
                break;
            }
            if (c == '1') {
                count[i]++;
            }
            i++;
        }
        total++;
    }

    printf("%d: ", total);
    for (int i = 0; i < N; i++) {
        printf("%d ", count[i]);
    }
    printf("\n");

    int gamma = 0, epsilon = 0;
    for (int i = 0; i < N; i++) {
        gamma *= 2;
        epsilon *= 2;
        if (count[i] > total / 2) {
            gamma++;
        } else {
            epsilon++;
        }
    }
    printf("%d * %d = %d\n", gamma, epsilon, gamma * epsilon);
}
