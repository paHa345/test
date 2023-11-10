import Link from "next/link";

function PageNotFound() {
  return (
    <div>
      <Link href="/">Home Page</Link>
      <div>
        <h1>Page Not Found!!!</h1>
      </div>
    </div>
  );
}

export default PageNotFound;
