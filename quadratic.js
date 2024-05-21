
'use strict'

/**
 * Calculates the discriminant of Ax^2 + Bx + C = 0.
 */
const disc = (A, B, C) => {
    let a = A
    let b = B
    let c = C

    const isIntCoeffs = Math.abs(Math.floor(A) - A) === 0 && Math.abs(Math.floor(b) - b) === 0 && Math.abs(Math.floor(C) - C) === 0

    if (isIntCoeffs) {
        if (a * c > 0) {
            a = Math.abs(A)
            c = Math.abs(C)
        }
        let loopCondition = false
        do {
            loopCondition = false
            if (a < c) {
                const tmp = a
                a = c
                c = tmp
            }
            const n = nearestInt(b / c)
            if (n !== 0) {
                const alpha = a - n * b
                if (alpha >= -a) {
                    b = b - n * c
                    a = alpha - n * b
                    if (a > 0) {
                        loopCondition = true
                    }
                }
            }
        } while (loopCondition)
    }
    return b * b - a * c
}

/**
 * Calculates the nearest integer to a number.
 */
const nearestInt = (n) => {
    return Math.max(
        Math.abs(n - Math.floor(n)),
        Math.abs(n - Math.ceil(n))
    )
}

/**
 * Solves the linear equation Ax^2 + Bx + C = 0 for x.
 * Computes the roots of the quadratic Ax^2 + Bx + C = 0.
 */
const quadraticSolve = (A, B, C) => {
    const b = -B / 2
    const q = disc(A, b, C)

    let X1 = 0
    let Y1 = 0
    let X2 = 0
    let Y2 = 0

    if (q < 0) {
        X1 = b / A
        X2 = X1
        Y1 = Math.sqrt(-q) / A
        Y2 = -Y1
    } else {
        const r = b + Math.sign(b) * Math.sqrt(q)

        Y1 = 0
        Y2 = 0

        if (r === 0) {
            X1 = C / A
            X2 = -C / A
        } else {
            X1 = C / r
            X2 = r / A
        }
    }

    return [
        { real: X1, i: Y1 },
        { real: X2, i: Y2 }
    ]
}
