import { checkLatest } from "../util";

test("check package version", () => {
  const res = expect(
    checkLatest({ pkgName: "create-admin-ui", version: "1.0.0" })
  ).tpBe(3);
});
