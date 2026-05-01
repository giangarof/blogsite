import crypto from "crypto";

export const restoreToken = () => {
    // this variable, generates the token
	const resetToken = crypto.randomBytes(32).toString("hex");

    // this variable, does hash it
    const hashedToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");

	return { resetToken, hashedToken };
};
