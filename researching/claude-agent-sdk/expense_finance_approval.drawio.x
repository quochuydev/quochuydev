<mxfile host="app.diagrams.net" modified="2025-01-24T00:00:00.000Z" agent="5.0" etag="generated" version="20.0.0" type="device">
  <diagram name="Expense Finance Approval" id="expense-finance-approval">
    <mxGraphModel dx="2074" dy="1194" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1200" pageHeight="800" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Flow 1: PO Creation and Approval Flow -->
        <mxCell id="flow1" value="PO Creation and Approval Flow" style="rounded=0;whiteSpace=wrap;html=1;fontStyle=1;fillColor=#f8f9fa;strokeColor=#6c757d;fontSize=16;fontFamily=Helvetica;fontWeight=bold" vertex="1" parent="1">
          <mxGeometry x="50" y="50" width="1150" height="300" as="geometry" />
        </mxCell>

        <!-- Flow 1 Elements -->
        <mxCell id="elem1" value="PO Dashboard View" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#b0deb3;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="70" y="80" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem2" value="Requester" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#fee750;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="250" y="80" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem3" value="Create Purchase Order" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#a7c5fc;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="430" y="80" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem4" value="PO Validation Policy" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#da99e6;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="610" y="80" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem5" value="PO Created" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#feae57;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="790" y="80" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem6" value="Send PO for Approval" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#a7c5fc;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="430" y="180" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem7" value="Approval Authority Policy" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#da99e6;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="610" y="180" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem8" value="PO Sent for Approval" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#feae57;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="790" y="180" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem9" value="Notification Policy" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#da99e6;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="970" y="180" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem10" value="Email Notification Service" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#ffb3c5;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="970" y="80" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem11" value="Pending Approval List" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#b0deb3;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="790" y="280" width="120" height="60" as="geometry" />
        </mxCell>

        <!-- Flow 1 Connections -->
        <mxCell id="conn1" edge="1" parent="1" source="elem1" target="elem2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn2" edge="1" parent="1" source="elem2" target="elem3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn3" edge="1" parent="1" source="elem3" target="elem4">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn4" edge="1" parent="1" source="elem4" target="elem5">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn5" edge="1" parent="1" source="elem5" target="elem1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="850" y="120" />
              <mxPoint x="130" y="120" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="conn6" edge="1" parent="1" source="elem2" target="elem6">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn7" edge="1" parent="1" source="elem6" target="elem7">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn8" edge="1" parent="1" source="elem7" target="elem8">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn9" edge="1" parent="1" source="elem8" target="elem9">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn10" edge="1" parent="1" source="elem9" target="elem10">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn11" edge="1" parent="1" source="elem8" target="elem11">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Flow 2: PO Approval Decision Flow -->
        <mxCell id="flow2" value="PO Approval Decision Flow" style="rounded=0;whiteSpace=wrap;html=1;fontStyle=1;fillColor=#f8f9fa;strokeColor=#6c757d;fontSize=16;fontFamily=Helvetica;fontWeight=bold" vertex="1" parent="1">
          <mxGeometry x="50" y="370" width="550" height="300" as="geometry" />
        </mxCell>

        <!-- Flow 2 Elements -->
        <mxCell id="elem12" value="Pending Approval List" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#b0deb3;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="70" y="400" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem13" value="Approver" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#fee750;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="250" y="400" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem14" value="Approve PO" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#a7c5fc;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="430" y="400" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem15" value="Budget Validation Policy" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#da99e6;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="250" y="500" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem16" value="Approval Granted" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#feae57;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="70" y="600" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem17" value="Reject PO" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#a7c5fc;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="430" y="500" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem18" value="Approval Rejected" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#feae57;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="250" y="600" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem19" value="Notification Policy" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#da99e6;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="430" y="600" width="120" height="60" as="geometry" />
        </mxCell>

        <!-- Flow 2 Connections -->
        <mxCell id="conn12" edge="1" parent="1" source="elem12" target="elem13">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn13" edge="1" parent="1" source="elem13" target="elem14">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn14" edge="1" parent="1" source="elem14" target="elem15">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn15" edge="1" parent="1" source="elem15" target="elem16">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn16" edge="1" parent="1" source="elem13" target="elem17">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn17" edge="1" parent="1" source="elem17" target="elem18">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn18" edge="1" parent="1" source="elem18" target="elem19">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Flow 3: PO Resubmission Flow -->
        <mxCell id="flow3" value="PO Resubmission Flow" style="rounded=0;whiteSpace=wrap;html=1;fontStyle=1;fillColor=#f8f9fa;strokeColor=#6c757d;fontSize=16;fontFamily=Helvetica;fontWeight=bold" vertex="1" parent="1">
          <mxGeometry x="620" y="370" width="580" height="200" as="geometry" />
        </mxCell>

        <!-- Flow 3 Elements -->
        <mxCell id="elem20" value="Approval Rejected" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#feae57;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="640" y="400" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem21" value="Requester" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#fee750;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="820" y="400" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem22" value="Resubmit PO" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#a7c5fc;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="1000" y="400" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem23" value="PO Validation Policy" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#da99e6;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="820" y="500" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem24" value="PO Sent for Approval" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#feae57;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="1000" y="500" width="120" height="60" as="geometry" />
        </mxCell>

        <!-- Flow 3 Connections -->
        <mxCell id="conn19" edge="1" parent="1" source="elem20" target="elem21">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn20" edge="1" parent="1" source="elem21" target="elem22">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn21" edge="1" parent="1" source="elem22" target="elem23">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn22" edge="1" parent="1" source="elem23" target="elem24">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Flow 4: Payment and Finance Flow -->
        <mxCell id="flow4" value="Payment and Finance Flow" style="rounded=0;whiteSpace=wrap;html=1;fontStyle=1;fillColor=#f8f9fa;strokeColor=#6c757d;fontSize=16;fontFamily=Helvetica;fontWeight=bold" vertex="1" parent="1">
          <mxGeometry x="50" y="690" width="1150" height="200" as="geometry" />
        </mxCell>

        <!-- Flow 4 Elements -->
        <mxCell id="elem25" value="Approval Granted" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#feae57;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="70" y="720" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem26" value="Finance Staff" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#fee750;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="250" y="720" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem27" value="Record Payment" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#a7c5fc;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="430" y="720" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem28" value="Vendor System" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#ffb3c5;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="610" y="720" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem29" value="Payment Made" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#feae57;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="790" y="720" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem30" value="Finance Budget Report" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#b0deb3;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="970" y="720" width="120" height="60" as="geometry" />
        </mxCell>

        <!-- Flow 4 Connections -->
        <mxCell id="conn23" edge="1" parent="1" source="elem25" target="elem26">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn24" edge="1" parent="1" source="elem26" target="elem27">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn25" edge="1" parent="1" source="elem27" target="elem28">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn26" edge="1" parent="1" source="elem28" target="elem29">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn27" edge="1" parent="1" source="elem29" target="elem30">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Flow 5: Audit and Cancellation Flow -->
        <mxCell id="flow5" value="Audit and Cancellation Flow" style="rounded=0;whiteSpace=wrap;html=1;fontStyle=1;fillColor=#f8f9fa;strokeColor=#6c757d;fontSize=16;fontFamily=Helvetica;fontWeight=bold" vertex="1" parent="1">
          <mxGeometry x="50" y="910" width="550" height="200" as="geometry" />
        </mxCell>

        <!-- Flow 5 Elements -->
        <mxCell id="elem31" value="Requester" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#fee750;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="70" y="940" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem32" value="Approver" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#fee750;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="250" y="940" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem33" value="Cancel PO" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#a7c5fc;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="430" y="940" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem34" value="PO Cancelled" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#feae57;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="250" y="1040" width="120" height="60" as="geometry" />
        </mxCell>

        <!-- Flow 5 Connections -->
        <mxCell id="conn28" edge="1" parent="1" source="elem31" target="elem33">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn29" edge="1" parent="1" source="elem32" target="elem33">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="conn30" edge="1" parent="1" source="elem33" target="elem34">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Additional elements for completeness -->
        <mxCell id="elem35" value="Vendor Catalog" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#b0deb3;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="620" y="910" width="120" height="60" as="geometry" />
        </mxCell>

        <mxCell id="elem36" value="Vendor System" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#ffb3c5;strokeColor=#666666;fontSize=12;fontFamily=Helvetica" vertex="1" parent="1">
          <mxGeometry x="800" y="910" width="120" height="60" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>