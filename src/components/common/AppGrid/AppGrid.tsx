import React, {
  forwardRef,
  useRef,
  Ref,
  useCallback,
  useImperativeHandle,
} from "react";
import { IRowNode, FirstDataRenderedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { IAppGridProps, TAppGrid } from "./AppGrid.types";
import clsx from "clsx";
import { AppGridConst } from "./AppGrid.constant";
import { IconSpinner } from "../../icons";

export const AppGridBase = <TData,>(
  {
    wrapperClassName,
    selectedFirstRowOnFirstDataRendered,
    onFirstDataRendered,
    ...props
  }: IAppGridProps,
  ref: Ref<TAppGrid<TData>>,
) => {
  const gridRef = useRef<AgGridReact<TData> | null>(null);

  const _onFirstDataRendered = useCallback(
    (params: FirstDataRenderedEvent<TData>) => {
      if (selectedFirstRowOnFirstDataRendered) {
        gridRef.current?.api.getDisplayedRowAtIndex(0)?.setSelected(true, true);
      }
      onFirstDataRendered?.(params);
    },
    [onFirstDataRendered, selectedFirstRowOnFirstDataRendered],
  );

  // Utils
  const getData = useCallback(() => {
    const data: TData[] = [];
    gridRef.current?.api.forEachNode((node) => {
      if (node.data) {
        data.push(node.data);
      }
    });
    return data;
  }, []);

  const getDataAfterFilterAndSort = useCallback(() => {
    const data: TData[] = [];
    gridRef.current?.api.forEachNodeAfterFilterAndSort((node) => {
      if (node.data) {
        data.push(node.data);
      }
    });
    return data;
  }, []);

  const getNodes = useCallback(() => {
    const rowNodes: IRowNode<TData>[] = [];
    gridRef.current?.api.forEachNode((node) => {
      rowNodes.push(node);
    });
    return rowNodes;
  }, []);

  const getNodesAfterFilterAndSort = useCallback(() => {
    const rowNodes: IRowNode<TData>[] = [];
    gridRef.current?.api.forEachNodeAfterFilterAndSort((node) => {
      rowNodes.push(node);
    });
    return rowNodes;
  }, []);

  const getFirstSelectedRow = useCallback(() => {
    return gridRef.current?.api.getSelectedRows()[0];
  }, []);

  const setLoading = useCallback((isLoading?: boolean) => {
    if (isLoading) {
      gridRef.current?.api.showLoadingOverlay();
    } else {
      gridRef.current?.api.hideOverlay();
    }
  }, []);

  useImperativeHandle(ref, () =>
    Object.assign(
      {
        getData,
        getDataAfterFilterAndSort,
        getNodes,
        getNodesAfterFilterAndSort,
        getFirstSelectedRow,
        setLoading,
      },
      gridRef.current,
    ),
  );

  return (
    <div className={clsx("ag-theme-alpine h-100", wrapperClassName)}>
      <AgGridReact<TData>
        ref={gridRef}
        headerHeight={AppGridConst.HeaderHeight}
        rowHeight={AppGridConst.RowHeight}
        loadingOverlayComponent={AppGridLoadingOverlay}
        onFirstDataRendered={_onFirstDataRendered}
        {...props}
      />
    </div>
  );
};

export const AppGridLoadingOverlay = () => {
  return <IconSpinner size={34} />;
};

export const AppGrid = Object.assign(forwardRef(AppGridBase), {
  LoadingOverlay: AppGridLoadingOverlay,
});
