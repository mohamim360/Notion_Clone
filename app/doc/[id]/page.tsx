import React from "react";
import Document from "@/components/Document";

function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  return (
    <div>
      <Document id={id} />
    </div>
  );
}

export default DocumentPage;
